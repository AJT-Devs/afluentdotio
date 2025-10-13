import { PrismaClient } from '@prisma/client'
import { Brainstorm } from '../entities/Brainstorm'


const prisma = new PrismaClient();

export async function createBrainstorm(brainstorm: Brainstorm) {
    const result = await prisma.brainstorm.create({
        data: {
            name: brainstorm.name,
            context: brainstorm.context,
            userId: brainstorm.userId    
        },
        select: {
            id: true,
            name: true,     
            context: true,
            date: true
        }
    })
    return result
}

export async function updateBrainstorm(brainstorm: Brainstorm) {
    const result = await prisma.brainstorm.update({
        where: { id: brainstorm.id },
        data: {
            name: brainstorm.name,
            context: brainstorm.context 
        }
    })
    return result
}

export async function deleteBrainstorm(id: number) {
    const result = await prisma.brainstorm.delete({
        where: {
            id: id
        }
    })
    return result
}

export async function getAllBrainstormByUser(userId: number) {
    const result = await prisma.brainstorm.findMany({
        where: {
            userId: userId
        }
    })
    return result
}   

export async function getBrainstormById(id: number) {
    const result = await prisma.brainstorm.findUnique({
        where: {
            id: id
        }
    })
    return result
}

