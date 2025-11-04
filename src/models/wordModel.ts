import { PrismaClient } from "@prisma/client";
import { Word } from "../entities/Word";

const prisma = new PrismaClient();

export async function createWord(word: Word){
    const result = await prisma.word.create({
        data: { 
            word: word.word,
            category: "general", // definir categoria depois
            proximity: word.proximity,
            brainstormId: word.brainstormId
        },
        select: {  
            id: true,
            word: true,
            proximity: true,
            brainstormId: true
        }
    })
    return result
}

export async function updateWord(word: Word){
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

export async function deleteWord(id: number){
    const result = await prisma.word.delete({
        where: { 
            id: id
         }, 
    })
    return result
}

export async function getAllWordByBrainstorm(brainstormId: number){
    const result = await prisma.word.findMany({
        where: {
            brainstormId: brainstormId
        }
    })
    return result
}

