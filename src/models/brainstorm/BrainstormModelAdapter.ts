import { Brainstorm } from "../../entities/Brainstorm";

export interface BrainstormModelAdapter {
    createBrainstorm(brainstorm: Brainstorm): Promise<Partial<Brainstorm>>;
    updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm>;
    deleteBrainstorm(id: string): Promise<Brainstorm>;
    getAllBrainstormByUser(userId: string): Promise<Brainstorm[]>;
    getBrainstormById(id: string): Promise<Brainstorm | null>;
}