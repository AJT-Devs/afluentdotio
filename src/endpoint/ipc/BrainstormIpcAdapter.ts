import { Part } from "@google/genai";
import { Brainstorm, Viewport, BrainstormEdge, BrainstormNode } from "../../entities/Brainstorm";
import { SuccessResponse } from "../../entities/SuccessResponse";

export default interface BrainstormIpcAdapter {
    generateAIWords(brainstorm: Brainstorm, aiKey: string, aiModelPreference: string): Promise<SuccessResponse<string[][]> | Error> ;
    postBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    updateBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse<Brainstorm> | Error> ;
    updateViewport(brainstormId: string, viewport: Viewport): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    updatePoolNode(brainstormId: string, node: BrainstormNode): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    updatePoolEdge(brainstormId: string, edge: BrainstormEdge): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    deleteBrainstorm(id: string): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    deletePoolNode(brainstormId: string, nodeId: string): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    deletePoolEdge(brainstormId: string, edgeId: string): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    getAllBrainstormByUser(userId: string): Promise<SuccessResponse<Brainstorm[]> | Error> ;
    getBrainstormById(id: string): Promise<SuccessResponse<Brainstorm> | Error> ;
    getBrainstormPoolById(brainstormId: string): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    addPoolNodes(brainstormId: string, node: BrainstormNode): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
    addPoolEdges(brainstormId: string, edge: BrainstormEdge): Promise<SuccessResponse<Partial<Brainstorm>> | Error> ;
}