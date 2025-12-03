import {WordData} from "@renderer/components/brainstorming/Pool"

// ========================================
// CONFIGURAÇÕES
// ========================================
export const LAYOUT_CONFIG = {
  wordsPerFirstLayer: 10,
  baseRadius: 260,
  radiusIncrement: 160,
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

export const calculatePosition = (range: number): { x: number; y: number } => {
  const layer = calculateLayer(range);
  const radius = calculateRadius(layer);
  const layerStartRange = getLayerStartRange(layer);
  const positionInLayer = range - layerStartRange;
  const layerCapacity = getLayerCapacity(layer);
  const angleStep = (2 * Math.PI) / layerCapacity;
  const angle = positionInLayer * angleStep;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return { x, y };
};

export const calculateAllPositions = (wordsList: Omit<WordData, 'x' | 'y'>[]): WordData[] => {
  return wordsList.map((word) => {
    const { x, y } = calculatePosition(word.range);
    return { ...word, x, y };
  });
};

// ========================================
  // RECALCULAR RANGES BASEADO EM POSIÇÕES
  // ========================================
export const recalculateRangesFromPositions = (wordsList: WordData[]): WordData[] => {
    const wordsWithDistance = wordsList.map((word) => {
        const distance = Math.sqrt(word.x ** 2 + word.y ** 2);
        return { ...word, distance };
    });

    const sorted = wordsWithDistance.sort((a, b) => a.distance - b.distance);

    const wordsWithNewRanges = sorted.map((word, index) => ({
        ...word,
        range: index,
    }));

    const recalculated = calculateAllPositions(
        wordsWithNewRanges.map(({ distance, ...word }) => word)
    );

    // console.log('📐 Ranges recalculados:', recalculated);

    return recalculated;
};