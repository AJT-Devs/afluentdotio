import { useCallback, useRef, useState } from 'react';
import { Node, NodeChange, useNodesState, XYPosition } from '@xyflow/react';
import { BrainstormNode, Position } from '../../../entities/Brainstorm';
import {
    calculatePosition,
    recalculateRangesFromPositions,
    calculateAllPositions,
} from '@renderer/hooks/CalculatePoolFunctions2';

export type WordNodeRFData = {
    word: string;
    onEditWord: (id: string, newText: string) => void;
    onDeleteWord: (id: string) => void;
};

export function usePool() {
    // domínio
    const [words, setWords] = useState<BrainstormNode[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const wordsRef = useRef(words);
    wordsRef.current = words;

    // fila de operações (serializa chamadas ao backend)
    const opQueueRef = useRef(Promise.resolve());

    // React Flow
    const [nodes, setNodes, onNodesChangeBase] = useNodesState<Node<WordNodeRFData>>([]);

    // debounce save do mover
    const saveTimer = useRef<number | null>(null);
    const pendingIdsRef = useRef<Set<string>>(new Set());

    const getBrainstormId = () => sessionStorage.getItem('brainstormId');

    // Backend
    const addNodeServer = useCallback(async (word: string, range: number, position: Position) => {
        const brainstormId = getBrainstormId();
        if (!brainstormId) return new Error('brainstormId ausente');
        return window.brainstorm.addPoolNodes(brainstormId, {
            word,
            range,
            position: { x: position.x, y: position.y },
        });
    }, []);

    const updateNodeServer = useCallback(async (node: BrainstormNode) => {
        const brainstormId = getBrainstormId();
        if (!brainstormId) return new Error('brainstormId ausente');
        return window.brainstorm.updatePoolNode(brainstormId, {
            id: node.id,
            word: node.word,
            range: node.range,
            position: { x: node.position?.x ?? 0, y: node.position?.y ?? 0 },
            category: node.category,
            proximity: node.proximity,
        });
    }, []);

    const deleteNodeServer = useCallback(async (id: string) => {
        const brainstormId = getBrainstormId();
        if (!brainstormId) return new Error('brainstormId ausente');
        if (window.brainstorm.deletePoolNode) {
            return window.brainstorm.deletePoolNode(brainstormId, id);
        }
        return null;
    }, []);

    // helpers
    const normalizeRangesSequential = (list: BrainstormNode[]) => {
        const sorted = [...list].sort((a, b) => (a.range ?? 0) - (b.range ?? 0));
        return sorted.map((w, i) => ({ ...w, range: i }));
    };

    const mapWordsToNodes = (list: BrainstormNode[], editFn: any, deleteFn: any): Node<WordNodeRFData>[] =>
        list.map((w) => ({
            id: w.id!,
            type: 'word',
            position: { x: w.position?.x ?? 0, y: w.position?.y ?? 0 },
            data: {
                word: w.word,
                onEditWord: editFn,
                onDeleteWord: deleteFn,
            },
        }));

    const runExclusive = (task: () => Promise<void>) => {
        opQueueRef.current = opQueueRef.current.then(task).catch((e) => {
            console.error('[usePool] op error:', e);
            setError(e?.message || 'Erro ao persistir dados.');
        });
        return opQueueRef.current;
    };

    // Carregar do backend (silent = não mostrar spinner a cada op)
    const loadBrainstorm = useCallback(
        async (silent = true) => {
            try {
                if (!silent) setLoading(true);
                setError(null);

    

                const brainstormId = getBrainstormId();
                if (!brainstormId) throw new Error('Brainstorm ID não encontrado na sessão.');

                const res = await window.brainstorm.getBrainstormPoolById(brainstormId);
                if (res instanceof Error) throw res;

                const serverNodes: BrainstormNode[] = (res.data?.pool?.nodes ?? []).map((n: any) =>
                    new BrainstormNode(
                        n.id,
                        n.word,
                        n.range,
                        new Position(n.position?.x ?? 0, n.position?.y ?? 0),
                        n.category,
                        n.proximity
                    )
                );

                const normalized = normalizeRangesSequential(serverNodes);
                const withPos = calculateAllPositions(normalized);

                setWords(withPos);
                setNodes(mapWordsToNodes(withPos, editWord, deleteWord));
            } catch (err: any) {
                setError(err?.message || 'Erro ao carregar brainstorm.');
            } finally {
                if (!silent) setLoading(false);
            }
        },
        [setNodes]
    );

    // Ações
    const editWord = useCallback(
        (id: string, newText: string) => {
            runExclusive(async () => {
                // 1) Atualiza no back
                const current = wordsRef.current.find((w) => w.id === id);
                if (!current) return;
                await updateNodeServer({ ...current, word: newText });

    

                // 2) Recarrega do back (estado fonte)
                await loadBrainstorm(true);
            });
        },
        [updateNodeServer, loadBrainstorm]
    );

    const deleteWord = useCallback(
        (id: string) => {
            runExclusive(async () => {
                // 1) Remove no back
                await deleteNodeServer(id);

    

                // 2) Pegamos o estado atual (sem o id) e recalculamos ranges/posições para persistir
                const prev = wordsRef.current;
                const remaining = prev.filter((w) => w.id !== id);
                const normalized = normalizeRangesSequential(remaining);
                const withPos = calculateAllPositions(normalized);

                // 3) Atualiza todos os restantes no back (ranges/pos corrigidos)
                const realNodes = withPos.filter((n) => n.id && !String(n.id).startsWith('temp-'));
                if (realNodes.length) {
                    await Promise.all(realNodes.map(updateNodeServer));
                }

                // 4) Recarrega do back para refletir tudo
                await loadBrainstorm(true);
            });
        },
        [deleteNodeServer, updateNodeServer, loadBrainstorm]
    );

    const addWord = useCallback(
        (text: string) => {
            runExclusive(async () => {
                // 1) Cria no back com range 0 e posição inicial calculada
                const initialPos = calculatePosition(0);
                const res = await addNodeServer(text, 0, initialPos);
                if (!(res && res.data)) {
                    // falhou criar, apenas recarrega para garantir consistência
                    await loadBrainstorm(true);
                    return;
                }
                const newId = res.data as string;

    

                // 2) Bump de ranges dos existentes e monta a lista com o novo
                const prev = wordsRef.current;
                const bumped = prev.map((w) => ({ ...w, range: w.range + 1 }));
                const newNode: BrainstormNode = new BrainstormNode(newId, text, 0, initialPos);
                const normalized = normalizeRangesSequential([newNode, ...bumped]);
                const withPos = calculateAllPositions(normalized);

                // 3) Atualiza todos no back (incluindo o novo) com os ranges/pos finais
                const realNodes = withPos.filter((n) => n.id);
                if (realNodes.length) {
                    await Promise.all(realNodes.map(updateNodeServer));
                }

                // 4) Recarrega do back
                await loadBrainstorm(true);
            });
        },
        [addNodeServer, updateNodeServer, loadBrainstorm]
    );

    // Mover: salva posição e recarrega (debounced)
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            onNodesChangeBase(changes);



            let changed = false;
            changes.forEach((change) => {
                if (change.type === 'position' && change.position && change.dragging === false) {
                    changed = true;
                    const id = change.id;
                    const pos: XYPosition = change.position;

                    // Atualiza local para feedback imediato
                    setWords((prev) =>
                        prev.map((w) =>
                            w.id === id ? { ...w, position: new Position(pos.x, pos.y) } : w
                        )
                    );

                    pendingIdsRef.current.add(id);
                }
            });

            if (changed) {
                if (saveTimer.current) window.clearTimeout(saveTimer.current);
                saveTimer.current = window.setTimeout(async () => {
                    const ids = Array.from(pendingIdsRef.current);
                    pendingIdsRef.current.clear();

                    await runExclusive(async () => {
                        const mapById = new Map(wordsRef.current.map((w) => [w.id!, w]));
                        const toUpdate = ids.map((id) => mapById.get(id)).filter(Boolean) as BrainstormNode[];

                        // atualiza apenas ids reais
                        const real = toUpdate.filter((n) => n.id && !String(n.id).startsWith('temp-'));
                        if (real.length) {
                            await Promise.all(real.map(updateNodeServer));
                        }

                        // recarrega do back
                        await loadBrainstorm(true);
                    });
                }, 300);
            }
        },
        [onNodesChangeBase, updateNodeServer, loadBrainstorm]
    );

    // Auto layout: recalcula range por posição e FORÇA posição final, persiste e recarrega
    const applyAutoLayout = useCallback(async () => {
        await runExclusive(async () => {
            const prev = wordsRef.current;
            const reorganized = recalculateRangesFromPositions(prev);
            const normalized = normalizeRangesSequential(reorganized);
            const withPos = calculateAllPositions(normalized);



            // persiste todos reais
            const real = withPos.filter((n) => n.id && !String(n.id).startsWith('temp-'));
            if (real.length) {
                await Promise.all(real.map(updateNodeServer));
            }

            // recarrega do back
            await loadBrainstorm(true);
        });
    }, [updateNodeServer, loadBrainstorm]);

    return {
        // estado
        words,
        nodes,
        loading,
        error,
        setError,


        // RF
        onNodesChange,
        setNodes,

        // ações
        loadBrainstorm,       // chame no mount com loadBrainstorm(false) para spinner
        addWord,
        editWord,
        deleteWord,
        applyAutoLayout,

        // util
        setWords,
    };
}