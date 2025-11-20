export class Brainstorm {
    id
    name
    context
    date
    userId
    pool

    constructor(id: string | null, name: string, context: string, date: Date | null, userId: string | null, pool?: BrainstormPool) {
        this.id = id
        this.name = name
        this.context = context
        this.date = date
        this.userId = userId
        this.pool = pool || new BrainstormPool([], [], { x: 0, y: 0, zoom: 1 })
    }
}

class BrainstormPool {
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

export class BrainstormNode {
    id
    word
    range
    position
    category
    proximity
    constructor(nodeId: string, word: string, range: number, position: Position, category: string, proximity: number) {}
}

export class BrainstormEdge {
    id
    sourceNodeId
    targetNodeId
    label
    constructor(id: string, sourceNodeId: string, targetNodeId: string, label: string) {}
}

export class Viewport {
    x
    y
    zoom
    constructor(x: number, y: number, zoom: number) {}
}
