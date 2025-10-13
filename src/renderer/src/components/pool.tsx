// src/components/Pool.tsx
import React, { useState, useRef, useEffect, useLayoutEffect, CSSProperties } from 'react';

// --- Constantes para a lógica do layout circular ---
const CENTER_X = 600;
const CENTER_Y = 400;
// NOVAS CONSTANTES PARA CONTROLE INDEPENDENTE:
const HORIZONTAL_PADDING = 150; // Espaçamento horizontal extra (maior)
const VERTICAL_PADDING = 100;   // Espaçamento vertical extra (menor)
const LAYER_SPACING = 120;
// REMOVIDO: BASE_RADIUS não é mais necessário, pois agora é dinâmico.

// --- Constantes de pan/zoom ---
const MIN_SCALE = 0.1;
const MAX_SCALE = 4;
const ZOOM_SENSITIVITY = 0.001;

// Tipagem para as props dos componentes
interface PoolItemProps {
  text: string;
  style: CSSProperties;
}

interface PoolProps {
  title: string;
  layers?: string[][]; // layers é um array de arrays de strings
}

const PoolItem: React.FC<PoolItemProps> = ({ text, style }) => (
  <div className="pool-item" style={style}>
    {text}
  </div>
);

const Pool: React.FC<PoolProps> = ({ title, layers = [] }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const startPointRef = useRef({ x: 0, y: 0 });
  const spacePressedRef = useRef(false);
  const poolRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [titleDimensions, setTitleDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === ' ') { e.preventDefault(); spacePressedRef.current = true; setIsSpacePressed(true); }};
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === ' ') { spacePressedRef.current = false; setIsSpacePressed(false); }};
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setTitleDimensions({ width: rect.width / scale, height: rect.height / scale });
    }
  }, [title, scale]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => { if (e.button === 1 || (spacePressedRef.current && e.button === 0)) { e.preventDefault(); setIsPanning(true); startPointRef.current = { x: e.clientX - position.x, y: e.clientY - position.y }; }};
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { if (!isPanning) return; e.preventDefault(); const newX = e.clientX - startPointRef.current.x; const newY = e.clientY - startPointRef.current.y; setPosition({ x: newX, y: newY }); };
  const handleMouseUpOrLeave = () => { setIsPanning(false); };
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => { e.preventDefault(); if (!poolRef.current) return; const rect = poolRef.current.getBoundingClientRect(); const mouseX = e.clientX - rect.left; const mouseY = e.clientY - rect.top; const delta = e.deltaY * -ZOOM_SENSITIVITY; const newScale = Math.min(Math.max(scale + delta, MIN_SCALE), MAX_SCALE); const newX = mouseX - (mouseX - position.x) * (newScale / scale); const newY = mouseY - (mouseY - position.y) * (newScale / scale); setScale(newScale); setPosition({ x: newX, y: newY }); };

  const baseRadiusX = titleDimensions.width / 2 + HORIZONTAL_PADDING;
  const baseRadiusY = titleDimensions.height / 2 + VERTICAL_PADDING;

  return (
    <div
      ref={poolRef}
      className={`pool-viewport ${isPanning ? 'panning' : ''} ${isSpacePressed ? 'space-pressed' : ''}`}
      onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave} onWheel={handleWheel}
    >
      <div
        className="pool-content"
        style={{
          width: '100%', height: '100%',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        <h1
          ref={titleRef}
          className="pool-title"
          style={{ top: `${CENTER_Y}px`, left: `${CENTER_X}px` }}
        >
          {title}
        </h1>

        {layers.map((items, layerIndex) => {
          const numItems = items.length;
          if (numItems === 0) return null;

          const radiusX = baseRadiusX + layerIndex * LAYER_SPACING;
          const radiusY = baseRadiusY + layerIndex * LAYER_SPACING;
          const angleStep = (2 * Math.PI) / numItems;

          return items.map((itemText, itemIndex) => {
            const angle = itemIndex * angleStep;
            const x = CENTER_X + radiusX * Math.cos(angle);
            const y = CENTER_Y + radiusY * Math.sin(angle);

            return (
              <PoolItem
                key={`${layerIndex}-${itemIndex}`}
                text={itemText}
                style={{ top: `${y}px`, left: `${x}px` }}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default Pool;