import PrismaSingleton from '../PrismaSingleton';
import { Brainstorm, Viewport, BrainstormNode, BrainstormEdge } from '../../entities/Brainstorm'
import { BrainstormModelAdapter } from './BrainstormModelAdapter';

export class PrismaBrainstormModel implements BrainstormModelAdapter {
    private prisma = PrismaSingleton.getInstance();
    public async createBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm> {
        const result = await this.prisma.brainstorm.create({
            data: {
                name: brainstorm.name,
                context: brainstorm.context,
                userId: brainstorm.userId,
                pool: brainstorm.pool    
            },
        });
        return result;
    }

    public async updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm | null> {
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstorm.id },
            data: {
                name: brainstorm.name,
                context: brainstorm.context,
            }
        });
        if (!result){
            return null;
        }
        return result;
    }

    public async updateViewport(brainstormId: string, viewport: Viewport): Promise<Partial<Brainstorm> | null> {
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    viewport: viewport
                }
            }
        });
        if (!result){
            return null;
        }
        return result;
    }

    public async updatePoolNode(brainstormId: string, node: BrainstormNode): Promise<Partial<Brainstorm> | null> {
        const brainstorm = await this.prisma.brainstorm.findUnique({
            where: { id: brainstormId },
        });
        if (!brainstorm){
            return brainstorm;
        }
        const nodes = brainstorm.pool.nodes.filter(n => n.id !== node.id);
        nodes.push(node); 
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    update: {
                        nodes: {
                            set: nodes
                        }
                    }
                }
            }
        });
        return result;
    }

    public async updatePoolEdge(brainstormId: string, edge: BrainstormEdge): Promise<Partial<Brainstorm> | null> {
        const brainstorm = await this.prisma.brainstorm.findUnique({
            where: { id: brainstormId },
        });
        if (!brainstorm){
            return null;
        }
        const edges = brainstorm.pool.edges.filter(e => e.id !== edge.id);
        edges.push(edge); 
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    update: {
                        edges: {
                            set: edges
                        }
                    }
                }
            }
        });
        return result;
    }

    public async deleteBrainstorm(id: string): Promise<Brainstorm | null> {
        const result = await this.prisma.brainstorm.delete({
            where: {
                id: id
            }
        });
        if (!result){
            return null;
        }
        return result;
    }

    public async deletePoolNode(brainstormId: string, nodeId: string): Promise<Partial<Brainstorm> | null> {
        const brainstorm = await this.prisma.brainstorm.findUnique({
            where: { id: brainstormId },
        });
        if (!brainstorm){
            return null;
        }
        const nodes = brainstorm.pool.nodes.filter(n => n.id !== nodeId);
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    update: {
                        nodes: {
                            set: nodes
                        }
                    }
                }
            }
        });
        return result;
    }

    public async deletePoolEdge(brainstormId: string, edgeId: string): Promise<Partial<Brainstorm> | null> {
        const brainstorm = await this.prisma.brainstorm.findUnique({
            where: { id: brainstormId },
        });
        if (!brainstorm){
            return null;
        }
        const edges = brainstorm.pool.edges.filter(e => e.id !== edgeId);
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    update: {
                        edges: {
                            set: edges
                        }
                    }
                }
            }
        });
        return result;
    }

    public async getAllBrainstormByUser(userId: string): Promise<Brainstorm[]> {
        const result = await this.prisma.brainstorm.findMany({
            where: {
                userId: userId
            }
        });
        return result;
    }   

    public async getBrainstormById(id: string): Promise<Brainstorm | null> {
        const result = await this.prisma.brainstorm.findUnique({
            where: {
                id: id
            }
        });
        return result;
    }

    public async getBrainstormPoolById(brainstormId: string): Promise<Partial<Brainstorm> | null> { {
        const result = await this.prisma.brainstorm.findUnique({
            where: { id: brainstormId },
            select: {
                id: true,
                pool: true
            }
        });
        if (!result){
            return null;
        }
        return result;
        } 
    }

    public async pushToPoolNodes(brainstormId: string, node: BrainstormNode): Promise<Partial<Brainstorm> | null> {
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    update: {
                        nodes: {
                            push: node
                        }
                    }
                }
            }
        });
        if (!result){
            return null;
        }
        return result;
    }
    public async pushToPoolEdges(brainstormId: string, edge: BrainstormEdge): Promise<Partial<Brainstorm> | null> {
        const result = await this.prisma.brainstorm.update({
            where: { id: brainstormId },
            data: {
                pool: {
                    update: {
                        edges: {
                            push: edge
                        }
                    }
                }
            }
        });
        if (!result){
            return null;
        }
        return result;
    }
}
