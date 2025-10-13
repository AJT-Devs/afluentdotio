export class Word{
    id
    word
    category
    proximity
    brainstormId
    constructor(id: number, word: string, category: string, proximity: number, brainstormId: number){
        this.id = id
        this.word = word
        this.category = category
        this.proximity = proximity
        this.brainstormId = brainstormId
    }
}