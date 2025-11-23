export interface Word{
    id : string;
    text : string;
    range: number;
    x: number;
    y: number;
}

export interface BrainstormData{
    id: string;
    title: string;
    description: string;
    words: Word[];
    createdAt: number;
    updatedAt: number;
}

export interface BrainstormConfig{
    showGuideCircles: boolean;
    wordsPerFirstLayer: number;
    distanceBetweenLayers: number;
    angleBetweenWords: number;
    showTitle: boolean;
}

export interface LayerInfo{
    layer: number;
    radius: number;
    capacity: number;
    rangeStart: number;
    rangeEnd: number;
    // color: string;
}

