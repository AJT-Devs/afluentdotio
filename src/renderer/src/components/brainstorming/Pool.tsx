import { ReactFlow, Controls, Background, Node, useNodesState } from '@xyflow/react';
import { useState, useEffect } from 'react';
import Console, {ConsoleProps} from "@renderer/components/brainstorming/ConsoleBrainstorming"

import Word, {WordNodeData} from "./Word";

import "@renderer/assets/stylesheets/components/brainstorming/pool.css";

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

type ConsoleType = ConsoleProps;

interface PoolProps {
  consoleProps : ConsoleType;
}

const nodeTypes = { word: Word };

const Pool = ({consoleProps, ...props}:PoolProps) => {
  const [words, setWords] = useState<WordData[]>(MOCK_WORDS);

  const handleAddWord = (text: string) => {
    const newWord: WordData = {
      id: Date.now().toString(), // ID temporário
      text,
    };

    console.log('➕ Adicionando palavra:', text);
    setWords((prev) => [...prev, newWord]);
  };

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
        proOptions={{ hideAttribution: true }}
        fitView
      >
        {/* <Controls/> */}
        <Console onAddWord={handleAddWord} />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Pool;