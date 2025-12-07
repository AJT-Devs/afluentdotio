// Pool.tsx
import { ReactFlow, Background, Node, useNodesState } from '@xyflow/react';
import { useState, useEffect,  } from 'react';
import { useNavigate } from "react-router";
import Console from '@renderer/components/brainstorming/ConsoleBrainstorming';
import Word, { WordNodeData } from './Word';
import { calculateAllPositions, recalculateRangesFromPositions } from "@renderer/hooks/CalculatePoolFunctions";
import '@renderer/assets/stylesheets/components/brainstorming/pool.css';

export interface WordData {
  id: string;
  text: string;
  range: number;
  x: number;
  y: number;
}

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
};

const Pool = () => {
  const [words, setWords] = useState<WordData[]>(MOCK_WORDS);
  const [isFreeMode, setIsFreeMode] = useState(false);

  // ADD
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

  // EDIT
  const handleEditWord = (id: string, newText: string): void => {
    setWords((prev) =>
      prev.map((word) => (word.id === id ? { ...word, text: newText } : word))
    );
  };

  // DELETE
  const handleDeleteWord = (id: string): void => {
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

  // DRAG STOP
  const handleNodeDragStop = (_event: any, node: Node) => {
    if (!isFreeMode) return;

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

  // TOGGLE FREE MODE
  const handleToggleFreeMode = () => {
    if (isFreeMode) {
      const reorganized = recalculateRangesFromPositions(words);
      setWords(reorganized);
    }

    setIsFreeMode((prev) => !prev);
  };

  // NODES
  const createNodes = (wordList: WordData[]): Node<WordNodeData>[] => {
    return wordList.map((word) => ({
      id: word.id,
      type: 'word',
      position: { x: word.x, y: word.y },
      data: {
        wordText: word.text,
        onEditWord: handleEditWord,      // ← NOME ALINHADO
        onDeleteWord: handleDeleteWord,  // ← NOME ALINHADO
      },
    }));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(createNodes(words));

  useEffect(() => {
    if (isFreeMode) {
      const currentNodesMap = new Map(nodes.map((n) => [n.id, n]));

      const updatedNodes: Node<WordNodeData>[] = words.map((word) => {
        const existingNode = currentNodesMap.get(word.id);

        if (existingNode) {
          return {
            ...existingNode,
            data: {
              wordText: word.text,
              onEditWord: handleEditWord,
              onDeleteWord: handleDeleteWord,
            },
          };
        } else {
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

    setNodes(createNodes(words));
  }, [words, isFreeMode]);

  const navigate = useNavigate();

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
          padding: 0.1,
          minZoom: 0.2,
          maxZoom: 1.5,
          duration: 0,
        }}
      >
        <Console
          onAddWord={handleAddWord}
          isFreeMode={isFreeMode}
          handleToggleFreeMode={handleToggleFreeMode}
          handleToBack={()=>{navigate("/dashboard")}}
        />

        <Background gap={20} />
      </ReactFlow>
    </div>
  );
};

export default Pool;