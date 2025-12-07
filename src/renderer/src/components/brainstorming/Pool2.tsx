// Pool.tsx
import { ReactFlow, Background, Node, useNodesState } from '@xyflow/react';
import { useState, useEffect, ReactNode } from 'react';
import '@renderer/assets/stylesheets/components/brainstorming/pool.css';

const INITIAL_WORDS = [
  { id: '1', text: 'Criatividade', range: 4 },
  { id: '2', text: 'Inovação', range: 3 },
  { id: '3', text: 'Tecnologia', range: 2 },
  { id: '4', text: 'Design', range: 1 },
  { id: '5', text: 'Futuro', range: 0 },
];

type PoolProps = {
  children : ReactNode;
  isFreeMode;
}

const Pool = ({children : Console, isFreeMode} : PoolProps) => {


  return (
    <div className="pool-container">
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        nodesDraggable={isFreeMode}
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
        {Console}
        <Background gap={20} />
      </ReactFlow>
    </div>
  );
};

export default Pool;