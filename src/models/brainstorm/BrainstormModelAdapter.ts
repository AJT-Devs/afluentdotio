import { Brainstorm, Viewport, BrainstormEdge, BrainstormNode } from "../../entities/Brainstorm";

export interface BrainstormModelAdapter {
    createBrainstorm(brainstorm: Brainstorm): Promise<Partial<Brainstorm>>;

    updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm | null>;
    updateViewport(brainstormId: string, viewport: Viewport): Promise<Partial<Brainstorm> | null>;
    updatePoolNode(brainstormId: string, node: BrainstormNode): Promise<Partial<Brainstorm> | null>;
    updatePoolEdge(brainstormId: string, edge: BrainstormEdge): Promise<Partial<Brainstorm> | null>;

    deleteBrainstorm(id: string): Promise<Brainstorm | null>;
    deletePoolNode(brainstormId: string, nodeId: string): Promise<Partial<Brainstorm> | null>;
    deletePoolEdge(brainstormId: string, edgeId: string): Promise<Partial<Brainstorm> | null>;

    getAllBrainstormByUser(userId: string): Promise<Brainstorm[]>;
    getBrainstormById(id: string): Promise<Brainstorm | null>;
    getBrainstormPoolById(brainstormId: string): Promise<Partial<Brainstorm> | null>;

    pushToPoolNodes(brainstormId: string, node: BrainstormNode): Promise<string | null>;
    pushToPoolEdges(brainstormId: string, edge: BrainstormEdge): Promise<Partial<Brainstorm> | null>;
}