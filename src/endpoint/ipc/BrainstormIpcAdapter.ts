import { Brainstorm, Viewport, BrainstormEdge, BrainstormNode } from "../../entities/Brainstorm";
import { SuccessResponse } from "../../entities/SuccessResponse";

export default interface BrainstormIpcAdapter {
    postBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse | Error> ;
    updateBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse | Error> ;
    updateViewport(brainstormId: string, viewport: Viewport): Promise<SuccessResponse | Error> ;
    updatePoolNode(brainstormId: string, node: BrainstormNode): Promise<SuccessResponse | Error> ;
    updatePoolEdge(brainstormId: string, edge: BrainstormEdge): Promise<SuccessResponse | Error> ;
    deleteBrainstorm(id: string): Promise<SuccessResponse | Error> ;
    deletePoolNode(brainstormId: string, nodeId: string): Promise<SuccessResponse | Error> ;
    deletePoolEdge(brainstormId: string, edgeId: string): Promise<SuccessResponse | Error> ;
    getAllBrainstormByUser(userId: string): Promise<SuccessResponse | Error> ;
    getBrainstormById(id: string): Promise<SuccessResponse | Error> ;
    getBrainstormPoolById(brainstormId: string): Promise<SuccessResponse | Error> ;
    addPoolNodes(brainstormId: string, node: BrainstormNode): Promise<SuccessResponse | Error> ;
    addPoolEdges(brainstormId: string, edge: BrainstormEdge): Promise<SuccessResponse | Error> ;
}