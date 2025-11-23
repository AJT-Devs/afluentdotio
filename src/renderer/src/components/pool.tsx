import { ReactFlow, Background, Node, useNodesState } from '@xyflow/react';
import { useState, useEffect } from 'react';

import Word, {WordNodeData} from "./Word";

import "@renderer/assets/stylesheets/components/pool.css";

interface WordData {
  id: string;
  text: string;
}

const MOCK_WORDS: WordData[] = [
  { id: '1', text: 'Criatividade' },
  { id: '2', text: 'Inovação' },
  { id: '3', text: 'Tecnologia' },
  { id: '4', text: 'Design' },
  { id: '5', text: 'Futuro' },
];

const nodeTypes = { word: Word };

const Pool = () => {
  const [words, setWords] = useState<WordData[]>(MOCK_WORDS);

  const handleEditWord = (id: string, newText: string): void => {
    console.log('Editando palavra:', id, newText);

    setWords((prev) =>
      prev.map((word) => (word.id === id ? { ...word, text: newText } : word))
    );
  };

  const handleDeleteWord = (id: string): void => {
    console.log('Deletando palavra:', id);

    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  const createNodes = (wordList: WordData[]): Node<WordNodeData>[] => {
    return wordList.map((word, index) => ({
      id: word.id,
      type: 'word',
      position: {
        x: Math.cos((index / wordList.length) * 2 * Math.PI) * 200,
        y: Math.sin((index / wordList.length) * 2 * Math.PI) * 200,
      },
      data: {
        wordText: word.text,
        onEditWord: handleEditWord,
        onDeleteWord: handleDeleteWord,
      },
    }));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<WordNodeData>>(
    createNodes(words)
  );

  useEffect(() => {
    const updatedNodes: Node<WordNodeData>[] = words.map((word) => {
      // Mantém posição existente ou cria nova
      const existingNode = nodes.find((n) => n.id === word.id);
      const position = existingNode?.position || { x: 0, y: 0 };

      return {
        id: word.id,
        type: 'word',
        position,
        data: {
          wordText: word.text,
          onEditWord: handleEditWord,
          onDeleteWord: handleDeleteWord,
        },
      };
    });

    setNodes(updatedNodes);
  }, [words]); // ← Atualiza quando words muda

  return(
    <div className="pool-container">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Pool;