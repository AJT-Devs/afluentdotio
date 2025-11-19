export class BrainstormPool {
    nodes = Array<BrainstormNode>()
    edges = Array<BrainstormEdge>()
    viewport = { x: 0, y: 0, zoom: 1 }

    constructor(nodes: BrainstormNode[], edges: BrainstormEdge[], viewport: Viewport) {
        this.nodes = nodes,
        this.edges = edges,
        this.viewport = viewport
    }
}
class Position {
    x
    y
    constructor(x: number,y: number) {

    }
}

class BrainstormNode {
    nodeId
    word
    range
    position
    category
    proximity
    constructor(nodeId: string, word: string, range: number, position: Position, category: string, proximity: number) {}
}

class BrainstormEdge {
    edgeId
    sourceNodeId
    targetNodeId
    label
    constructor(edgeId: string, sourceNodeId: string, targetNodeId: string, label: string) {}
}

class Viewport {
    x
    y
    zoom
    constructor(x: number, y: number, zoom: number) {}
}