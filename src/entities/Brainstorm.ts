export class Brainstorm{
    id
    name
    context
    date
    userId
    constructor(id: string | null, name: string, context: string, date: Date | null, userId: string | null) {
        this.id = id
        this.name = name
        this.context = context
        this.date = date
        this.userId = userId
    }
}
