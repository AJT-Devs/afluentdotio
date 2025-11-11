import PrismaSingleton from "../PrismaSingleton";
import { Word } from "../../entities/Word";
import { WordModelAdapter } from "./WordModelAdapter";

export class PrismaWordModel implements WordModelAdapter {
    private prisma = PrismaSingleton.getInstance();

    public async createWord(word: Word): Promise<Word> {
    const result = await this.prisma.word.create({
        data: { 
            word: word.word,
            category: word.category,
            proximity: word.proximity,
            brainstormId: word.brainstormId
        }
    })
    return result
}

    public  async updateWord(word: Word): Promise<Word> {
        const result = await this.prisma.word.update({
            where: { id: word.id }, 
            data: {
                word: word.word,
                category: word.category,
                proximity: word.proximity,
                brainstormId: word.brainstormId
            },
            select: {  
                id: true,
                word: true,
                category: true,
                proximity: true,
                brainstormId: true
            }
        })
        return result
    }

    public async deleteWord(id: string): Promise<Word> {
        const result = await this.prisma.word.delete({
            where: { 
                id: id
            }, 
        })
        return result
    }

    public async getWordById(id: string): Promise<Word | null> {
        const result = await this.prisma.word.findUnique({
            where: {
                id: id
            }
        })
        return result
    }

    public async getAllWordByBrainstorm(brainstormId: string): Promise<Word[]> {
        const result = await this.prisma.word.findMany({
            where: {
                brainstormId: brainstormId
            }
        })
        return result
    }

}