import { PrismaClient } from "@prisma/client";
import { Word } from "../entities/Word";

const prisma = new PrismaClient();

export class WordModel {

    public static async createWord(word: Word): Promise<Word> {
    const result = await prisma.word.create({
        data: { 
            word: word.word,
            category: word.category,
            proximity: word.proximity,
            brainstormId: word.brainstormId
        }
    })
    return result
}

    public static async updateWord(word: Word): Promise<Word> {
        const result = await prisma.word.update({
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

    public static async deleteWord(id: string): Promise<Word> {
        const result = await prisma.word.delete({
            where: { 
                id: id
            }, 
        })
        return result
    }

    public static async getWordById(id: string): Promise<Word | null> {
        const result = await prisma.word.findUnique({
            where: {
                id: id
            }
        })
        return result
    }

    public static async getAllWordByBrainstorm(brainstormId: string): Promise<Word[]> {
        const result = await prisma.word.findMany({
            where: {
                brainstormId: brainstormId
            }
        })
        return result
    }

}