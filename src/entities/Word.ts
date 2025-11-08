export class Word{
    id
    word
    category
    proximity
    brainstormId
    constructor(id: string | null, word: string, category: string, proximity: number, brainstormId: string | null){
        this.id = id
        this.word = word
        this.category = category
        this.proximity = proximity
        this.brainstormId = brainstormId
    }
}