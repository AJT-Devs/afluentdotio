import PrismaSingleton from '../PrismaSingleton';
import { Brainstorm } from '../../entities/Brainstorm'
import { BrainstormModelAdapter } from './BrainstormModelAdapter';

export class PrismaBrainstormModel implements BrainstormModelAdapter {
    private prisma = PrismaSingleton.getInstance();
    public async createBrainstorm(brainstorm: Brainstorm): Promise<Partial<Brainstorm>> {
        const result = await this.prisma.brainstorm.create({
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

    public async updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm> {
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstorm.id },
            data: {
                name: brainstorm.name,
                context: brainstorm.context 
            }
        })
        return result
    }

    public async deleteBrainstorm(id: string): Promise<Brainstorm> {
        const result = await this.prisma.brainstorm.delete({
            where: {
                id: id
            }
        })
        return result
    }

    public async getAllBrainstormByUser(userId: string): Promise<Brainstorm[]> {
        const result = await this.prisma.brainstorm.findMany({
            where: {
                userId: userId
            }
        })
        return result
    }   

    public async getBrainstormById(id: string): Promise<Brainstorm | null> {
        const result = await this.prisma.brainstorm.findUnique({
            where: {
                id: id
            }
        })
        return result
    }
}
