export class User {
    id
    name
    photo
    aikey
    preferenceaimodel
    constructor(id: string | null | undefined, 
                name: string | null | undefined, 
                photo: string | null | undefined, 
                aikey: string | null | undefined,
                preferenceaimodel: AiModels | null | undefined
                ) {
        this.id = id
        this.name = name
        this.photo = photo
        this.aikey = aikey
        this.preferenceaimodel = preferenceaimodel
    }
}
