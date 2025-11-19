import { BrainstormPool } from "./BrainstormPool";
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
