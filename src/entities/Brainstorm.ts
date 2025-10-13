export class Brainstorm{
    id
    name
    context
    date
    UserId
    constructor(id: number, name: string, context: string, date: Date, UserId: number) {
        this.id = id
        this.name = name
        this.context = context
        this.date = date
        this.UserId = UserId
    }
}
