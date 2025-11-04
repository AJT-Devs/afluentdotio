export class User {
    id
    name
    photo
    aikey
    constructor(id: number, 
                name: string | null | undefined, 
                photo: string | null | undefined, 
                aikey: string | null | undefined
                ) {
        this.id = id
        this.name = name
        this.photo = photo
        this.aikey = aikey
    }
}