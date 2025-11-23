import {LayerInfo} from '../types/brainstorm';

const BASE_RADIUS = 200;
const RADIUS_INCREMENT = 120;
const CAPACITY_MULTIPLIER = 1.2;

export function calculateLayer(
    range: number,
    wordsPerFirstLayer = 10
): number {
    if (range < wordsPerFirstLayer) {
        return 1;
    }

    let accumulated = wordsPerFirstLayer;
    let layer = 1;
    let layerCapacity = wordsPerFirstLayer;

    while (range >= accumulated) {
        layer++;

        layerCapacity = Math.floor(layerCapacity * CAPACITY_MULTIPLIER);
        accumulated += layerCapacity;
    }

    return layer;
}

export function calculateRadius(layer: number): number {
  return BASE_RADIUS + (layer - 1) * RADIUS_INCREMENT;
}

export function getLayerCapacity(
  layer: number,
  wordsPerFirstLayer = 10
): number {
  if (layer === 1) {
    return wordsPerFirstLayer;
  }

  let capacity = wordsPerFirstLayer;
  
  for (let i = 2; i <= layer; i++) {
    capacity = Math.floor(capacity * CAPACITY_MULTIPLIER);
  }

  return capacity;
}

export function getLayerRangeStart(
  layer: number,
  wordsPerFirstLayer = 10
): number {
  if (layer === 1) return 0;

  let accumulated = 0;

  for (let i = 1; i < layer; i++) {
    accumulated += getLayerCapacity(i, wordsPerFirstLayer);
  }

  return accumulated;
}

export function getLayerRangeEnd(
  layer: number,
  wordsPerFirstLayer = 10
): number {
  const start = getLayerRangeStart(layer, wordsPerFirstLayer);
  const capacity = getLayerCapacity(layer, wordsPerFirstLayer);
  return start + capacity - 1;
}

export function getLayerInfo(
  layer: number,
  wordsPerFirstLayer = 10
): LayerInfo {
  return {
    layer,
    radius: calculateRadius(layer),
    capacity: getLayerCapacity(layer, wordsPerFirstLayer),
    rangeStart: getLayerRangeStart(layer, wordsPerFirstLayer),
    rangeEnd: getLayerRangeEnd(layer, wordsPerFirstLayer)
  };
}

export function getAllLayersInfo(
  maxRange: number,
  wordsPerFirstLayer = 10
): LayerInfo[] {
  if (maxRange < 0) return [];

  const maxLayer = calculateLayer(maxRange, wordsPerFirstLayer);
  const layers: LayerInfo[] = [];

  for (let i = 1; i <= maxLayer; i++) {
    layers.push(getLayerInfo(i, wordsPerFirstLayer));
  }

  return layers;
}