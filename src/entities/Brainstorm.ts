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

export class BrainstormPool {
    nodes 
    edges 
    viewport 

    constructor(nodes?: BrainstormNode[], edges?: BrainstormEdge[], viewport?: Viewport) {
        this.nodes = nodes || Array<BrainstormNode>(),
        this.edges = edges || Array<BrainstormEdge>(),
        this.viewport = viewport || new Viewport(0,0,1)
    }
    }
export class Position {
    x
    y
    constructor(x: number,y: number) {
        this.x = x
        this.y = y
    }
}

export class BrainstormNode {
    id?
    word
    range
    position?
    category?
    proximity?
    constructor(id: string, word: string, range: number, position?: Position, category?: string, proximity?: number) {
        this.id = id
        this.word = word
        this.range = range
        this.position = position || new Position(0,0)
        this.category = category
        this.proximity = proximity
    }
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
