import { ReactFlow, Background, Node, useNodesState } from '@xyflow/react';
import { useState, useEffect } from 'react';
import Console from '@renderer/components/brainstorming/ConsoleBrainstorming';
import Word, { WordNodeData } from './Word';
import {calculateAllPositions, recalculateRangesFromPositions} from "@renderer/hooks/CalculatePoolFunctions";
import '@renderer/assets/stylesheets/components/brainstorming/pool.css';

// import Title from './Title';

// ========================================
// TYPES
// ========================================
export interface WordData {
  id: string;
  text: string;
  range: number;
  x: number;
  y: number;
}

// const [brainstormTitle, setBrainstormTitle] = useState('Meu Brainstorming');
// const [showTitle, setShowTitle] = useState(true);


// ========================================
// DADOS INICIAIS
// ========================================
const INITIAL_WORDS = [
  { id: '1', text: 'Criatividade', range: 4 },
  { id: '2', text: 'Inovação', range: 3 },
  { id: '3', text: 'Tecnologia', range: 2 },
  { id: '4', text: 'Design', range: 1 },
  { id: '5', text: 'Futuro', range: 0 },
];

const MOCK_WORDS: WordData[] = calculateAllPositions(INITIAL_WORDS);

const nodeTypes = { 
  word: Word,
  // Title : Title,
};

// ========================================
// COMPONENT
// ========================================
const Pool = () => {
  const [words, setWords] = useState<WordData[]>(MOCK_WORDS);
  const [isFreeMode, setIsFreeMode] = useState(false); // ← NOVO

  // ========================================
  // HANDLERS
  // ========================================

  const handleAddWord = (text: string) => {
    const updatedWords = words.map((word) => ({
      ...word,
      range: word.range + 1,
    }));

    const newWordWithoutPosition = {
      id: Date.now().toString(),
      text,
      range: 0,
    };

    const allWordsWithPositions = calculateAllPositions([
      newWordWithoutPosition,
      ...updatedWords,
    ]);

    setWords(allWordsWithPositions);
  };

  const handleEditWord = (id: string, newText: string): void => {
    console.log('✏️ Editando palavra:', id, newText);
    setWords((prev) => prev.map((word) => (word.id === id ? { ...word, text: newText } : word)));
  };

  const handleDeleteWord = (id: string): void => {
    console.log('🗑️ Deletando palavra:', id);

    const wordToDelete = words.find((w) => w.id === id);
    if (!wordToDelete) return;

    const deletedRange = wordToDelete.range;

    const remainingWords = words
      .filter((word) => word.id !== id)
      .map((word) => ({
        ...word,
        range: word.range > deletedRange ? word.range - 1 : word.range,
      }));

    const updatedWords = calculateAllPositions(remainingWords);
    setWords(updatedWords);
  };

  const handleNodeDragStop = (node) => {
    if (!isFreeMode) return;

    // console.log('📍 Palavra movida:', node.id, 'para', node.position);

    setWords((prev) =>
      prev.map((word) =>
        word.id === node.id
          ? {
              ...word,
              x: node.position.x,
              y: node.position.y,
            }
          : word
      )
    );
  };

  const handleToggleFreeMode = () => {
    if (isFreeMode) {
      // console.log('🔒 Desativando modo livre - Recalculando ranges...');
      const reorganized = recalculateRangesFromPositions(words);
      setWords(reorganized);
    } else {
      // console.log('🔓 Ativando modo livre - Pode mover livremente!');
    }

    setIsFreeMode((prev) => !prev);
  };

  // ========================================
  // NODES
  // ========================================

  const createNodes = (wordList: WordData[]): Node<WordNodeData>[] => {
    return wordList.map((word) => ({
      id: word.id,
      type: 'word',
      position: { x: word.x, y: word.y },
      data: {
        wordText: word.text,
        onEditWord: handleEditWord,
        onDeleteWord: handleDeleteWord,
      },
    }));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<WordNodeData>>(createNodes(words));

  useEffect(() => {
  if (isFreeMode) {
    
    // Cria mapa de nodes atuais
    const currentNodesMap = new Map(nodes.map(n => [n.id, n]));
    
    // Processa cada palavra
    const updatedNodes = words.map(word => {
      const existingNode = currentNodesMap.get(word.id);
      
      if (existingNode) {
        // Palavra já existe: mantém posição, atualiza só data
        return {
          ...existingNode,
          data: {
            wordText: word.text, // ← Atualiza texto (caso tenha editado)
            onEditWord: handleEditWord,
            onDeleteWord: handleDeleteWord,
          },
        };
      } else {
        // Palavra nova: usa posição calculada
        return {
          id: word.id,
          type: 'word',
          position: { x: word.x, y: word.y },
          data: {
            wordText: word.text,
            onEditWord: handleEditWord,
            onDeleteWord: handleDeleteWord,
          },
        };
      }
    });
    
    setNodes(updatedNodes);
    return;
  }

  // Modo auto: recalcula tudo
  setNodes(createNodes(words));
}, [words, isFreeMode]);

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="pool-container">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeDragStop={handleNodeDragStop}
        nodeTypes={nodeTypes}
        nodesDraggable={isFreeMode}
        proOptions={{ hideAttribution: true }}
        fitView
        minZoom={0.2}
        maxZoom={2}

        fitViewOptions={{
          padding: 0.1,      // 20% de margem
          minZoom: 0.2,      // Zoom mínimo do fit
          maxZoom: 1.5,      // Zoom máximo do fit
          duration: 0,     // Animação em ms (0 = instantâneo)
        }}
        >
        <Console onAddWord={handleAddWord} isFreeMode={isFreeMode} handleToggleFreeMode={handleToggleFreeMode}/>

        <Background gap={20} />
      </ReactFlow>
    </div>
  );
};

export default Pool;