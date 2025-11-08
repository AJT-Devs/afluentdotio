import { PrismaClient } from '@prisma/client'
import { Brainstorm } from '../entities/Brainstorm'

//sugestão do prisma deixar uma instancia global de fora da classe
//funciona como singletown, para nao criar conexões com o banco a cada chamada de metodo
const prisma = new PrismaClient();

export class BrainstormModel {
    public static async createBrainstorm(brainstorm: Brainstorm): Promise<Partial<Brainstorm>> {
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

    static async updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm> {
        const result = await prisma.brainstorm.update({
            where: { id: brainstorm.id },
            data: {
                name: brainstorm.name,
                context: brainstorm.context 
            }
        })
        return result
    }

    static async deleteBrainstorm(id: string): Promise<Brainstorm> {
        const result = await prisma.brainstorm.delete({
            where: {
                id: id
            }
        })
        return result
    }

    static async getAllBrainstormByUser(userId: string): Promise<Brainstorm[]> {
        const result = await prisma.brainstorm.findMany({
            where: {
                userId: userId
            }
        })
        return result
    }   

    static async getBrainstormById(id: string): Promise<Brainstorm | null> {
        const result = await prisma.brainstorm.findUnique({
            where: {
                id: id
            }
        })
        return result
    }
}
