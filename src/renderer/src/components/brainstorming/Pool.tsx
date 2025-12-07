// Pool.tsx
import { ReactFlow, Background, Node, useNodesState } from '@xyflow/react';
import { useState, useEffect, useRef,  } from 'react';
import { useNavigate } from "react-router";
import Console from '@renderer/components/brainstorming/ConsoleBrainstorming';
import Word, { WordNodeData } from './Word';
import { calculatePosition, calculateAllPositions, recalculateRangesFromPositions } from "@renderer/hooks/CalculatePoolFunctions";
import '@renderer/assets/stylesheets/components/brainstorming/pool.css';
import { ErrorModal } from '../modals/ErrorModal';

import {BrainstormNode, BrainstormPool} from '../../../../entities/Brainstorm'
import { b } from 'motion/react-client';

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
  const hasFetched = useRef<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const updateWords = async(wordsToUpdate?: WordData[]) => {
    try{
      const brainstormId = sessionStorage.getItem('brainstormId') || null;
      if(!brainstormId){
        setErrorMessage("Erro ao atualizar palavras. Volte a pagina de dashboard e tente novamente.");
        navigate("/dashboard");  
        return;
      }
      if(!wordsToUpdate){
        words.map(async (word) => {
        await window.brainstorm.updatePoolNode(brainstormId, {
          id: word.id,
          word: word.text,
          range: word.range,
          position: { x: word.x, y: word.y }
        });
      });
      } else {
        wordsToUpdate.map(async (word) => {
          await window.brainstorm.updatePoolNode(brainstormId, {
            id: word.id,
            word: word.text,
            range: word.range,
            position: { x: word.x, y: word.y }
          });
        });
      }
    }catch(error){
      if(error instanceof Error){
        setErrorMessage(error.message);
      }
      setErrorMessage("Erro ao atualizar palavras. Por favor, tente novamente.");
      return;
    }
  }
  
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

    const saveNode = async () => {
      try{
      const brainstormId = sessionStorage.getItem('brainstormId') || null;
      if(!brainstormId){
        setErrorMessage("Erro ao adicionar palavra. Volte a pagina de dashboard e tente novamente.");
        navigate("/dashboard");  
        return;
      }
      const newNodeId = await window.brainstorm.addPoolNodes(brainstormId, {
        word: allWordsWithPositions[0].text,
        range: allWordsWithPositions[0].range,
        position: { x: allWordsWithPositions[0].x, y: allWordsWithPositions[0].y }
      });
      if(newNodeId instanceof Error){
        setErrorMessage(newNodeId.message);
        return;
      }
      if(!newNodeId){
        setErrorMessage("Erro ao adicionar palavra. Por favor, tente novamente.");
        return;
      }
      newWordWithoutPosition.id = newNodeId.data;

      allWordsWithPositions.map(async (word) => {
        await window.brainstorm.updatePoolNode(brainstormId, {
          id: word.id,
          word: word.text,
          range: word.range,
          position: { x: word.x, y: word.y }
        });
      })

    }catch(error){
      if(error instanceof Error){
        setErrorMessage(error.message);
      }
      setErrorMessage("Erro ao adicionar palavra. Por favor, tente novamente.");
      return;
    }
    };
    saveNode();
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
  const handleNodeDragStop = async (_event: any, node: Node) => {
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
    await updateWords(nodes.map((n) => ({
      id: n.id,
      text: (n.data as WordNodeData).wordText,  
      range: words.find((w) => w.id === n.id)?.range || 0,
      x: n.position.x,
      y: n.position.y,
    })));

  };

  // TOGGLE FREE MODE
  const handleToggleFreeMode = async () => {
    if (isFreeMode) {
      const reorganized = recalculateRangesFromPositions(words); 
      setWords(reorganized);
    }
    await updateWords();
    console.log("deu update")
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
    const getBrainstorm = async () => {
      try{
        hasFetched.current = true;
        const brainstormId = sessionStorage.getItem('brainstormId') || null;
        if (!brainstormId) {
          setErrorMessage("Erro ao carregar brainstorming. Por favor, tente novamente.");
          return;
        }
        const brainstormData = await window.brainstorm.getBrainstormPoolById(brainstormId);
        if (brainstormData instanceof Error) {
          setErrorMessage(brainstormData.message);
          return;
        }
        const brainstormPool: BrainstormPool = brainstormData.data.pool;
        const brainstormNodes = brainstormPool.nodes;
        setWords(brainstormNodes.map((node: BrainstormNode) => ({
          id: node.id,
          text: node.word,
          range: node.range,
          x: node.position ? node.position.x : 0,
          y: node.position ? node.position.y : 0,
        })));
      }catch(error){
        if(error instanceof Error){
          setErrorMessage(error.message);
        }
        setErrorMessage("Erro ao carregar brainstorm. Por favor, tente novamente.");
      }
    }

    if (!hasFetched.current) {
      getBrainstorm();
    }

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


  return (
    <div className="pool-container">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeDragStop={handleNodeDragStop}
        nodeTypes={nodeTypes}
        nodesDraggable={isFreeMode}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
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
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </div>
  );
};

export default Pool;