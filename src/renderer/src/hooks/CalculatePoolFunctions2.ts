import { BrainstormNode, Position } from '../../../entities/Brainstorm';

// ========================================
// CONFIGURAÇÕES
// ========================================
export const LAYOUT_CONFIG = {
  wordsPerFirstLayer: 10,
  baseRadius: 260,
  radiusIncrement: 200,
  capacityMultiplier: 1.2,
};

// ========================================
// FUNÇÕES DE CÁLCULO
// ========================================

export const calculateLayer = (range: number): number => {
  const { wordsPerFirstLayer, capacityMultiplier } = LAYOUT_CONFIG;
  if (range < wordsPerFirstLayer) return 1;

  let accumulated = wordsPerFirstLayer;
  let layer = 1;
  let layerCapacity = wordsPerFirstLayer;

  while (range >= accumulated) {
    layer++;
    layerCapacity = Math.floor(layerCapacity * capacityMultiplier);
    accumulated += layerCapacity;
  }

  return layer;
};

export const calculateRadius = (layer: number): number => {
  const { baseRadius, radiusIncrement } = LAYOUT_CONFIG;
  return baseRadius + (layer - 1) * radiusIncrement;
};

export const getLayerCapacity = (layer: number): number => {
  const { wordsPerFirstLayer, capacityMultiplier } = LAYOUT_CONFIG;
  if (layer === 1) return wordsPerFirstLayer;

  let capacity = wordsPerFirstLayer;
  for (let i = 2; i <= layer; i++) {
    capacity = Math.floor(capacity * capacityMultiplier);
  }

  return capacity;
};

export const getLayerStartRange = (layer: number): number => {
  if (layer === 1) return 0;

  let accumulated = 0;
  for (let i = 1; i < layer; i++) {
    accumulated += getLayerCapacity(i);
  }

  return accumulated;
};

/**
 * Calcula a posição (x, y) para um determinado range
 */
export const calculatePosition = (range: number): Position => {
  const layer = calculateLayer(range);
  const radius = calculateRadius(layer);
  const layerStartRange = getLayerStartRange(layer);
  const positionInLayer = range - layerStartRange;
  const layerCapacity = getLayerCapacity(layer);

  const angleStep = (2 * Math.PI) / layerCapacity;
  const angle = positionInLayer * angleStep;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return new Position(x, y);
};

/**
 * Calcula a posição de TODOS os BrainstormNode com base no range.
 * Retorna um NOVO array (não muta o original).
 */
export const calculateAllPositions = (
  nodes: BrainstormNode[]
): BrainstormNode[] => {
  return nodes.map((node) => {
    const position = calculatePosition(node.range);

    // Retorna um "clone" com posição atualizada
    return {
      ...node,
      position,
    };
  });
};

// ========================================
// RECALCULAR RANGES BASEADO EM POSIÇÕES
// ========================================

/**
 * Recalcula os ranges dos nós com base na distância do centro (0,0).
 * - Nós mais perto do centro recebem ranges menores (0, 1, 2, ...)
 * - Depois recalcula as posições com base nos novos ranges.
 */
export const recalculateRangesFromPositions = (
  nodes: BrainstormNode[]
): BrainstormNode[] => {
  // 1. Calcula distância de cada nó ao centro
  const nodesWithDistance = nodes.map((node) => {
    const pos = node.position ?? new Position(0, 0);
    const distance = Math.sqrt(pos.x ** 2 + pos.y ** 2);
    return { ...node, _distance: distance as number };
  });

  // 2. Ordena por distância (mais perto primeiro)
  const sorted = [...nodesWithDistance].sort(
    (a, b) => (a._distance as number) - (b._distance as number)
  );

  // 3. Atribui novos ranges sequenciais
  const nodesWithNewRanges: BrainstormNode[] = sorted.map((node, index) => ({
    ...node,
    range: index,
  }));

  // 4. Remove campo temporário _distance e recalcula posições
  const cleanedNodes = nodesWithNewRanges.map(({...rest }) => rest);
  const recalculated = calculateAllPositions(cleanedNodes);

  return recalculated;
};