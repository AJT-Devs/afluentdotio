import { ipcMain } from "electron";

import BrainstormController from "../../controller/brainstormController";
import { Brainstorm, BrainstormEdge, BrainstormNode, Viewport } from "../../entities/Brainstorm";

export class BrainstormIpcEndpoint {
    public static async postBrainstorm(): Promise<void> {
        ipcMain.handle('postBrainstorm', async (event, brainstorm:Brainstorm) => {
            const result = await BrainstormController.postBrainstorm(brainstorm);
            return result;
        });
    }

    public static async updateBrainstorm(): Promise<void> {
        ipcMain.handle('updateBrainstorm', async (event, brainstorm) => {
            const result = await BrainstormController.updateBrainstorm(brainstorm);
            return result;
        });
    }

    public static async updateViewport(): Promise<void> {
        ipcMain.handle('updateViewport', async (event, brainstormId: string, viewport: Viewport) => {
            const result = await BrainstormController.updateViewport(brainstormId, viewport);
            return result;
        });
    }

    public static async updatePoolNode(): Promise<void> {
        ipcMain.handle('updatePoolNode', async (event, brainstormId: string, node: BrainstormNode) => {
            const result = await BrainstormController.updatePoolNode(brainstormId, node);
            return result;
        });
    }

    public static async updatePoolEdge(): Promise<void> {
        ipcMain.handle('updatePoolEdge', async (event, brainstormId: string, edge: BrainstormEdge) => {
            const result = await BrainstormController.updatePoolEdge(brainstormId, edge);
            return result;
        });
    }

    public static async deleteBrainstorm(): Promise<void> {
        ipcMain.handle('deleteBrainstorm', async (event, brainstormId: string) => {
            const result = await BrainstormController.deleteBrainstorm(brainstormId);
            return result;
        });
    }

    public static async deletePoolNode(): Promise<void> {
        ipcMain.handle('deletePoolNode', async (event, brainstormId: string, nodeId: string) => {
            const result = await BrainstormController.deletePoolNode(brainstormId, nodeId);
            return result;
        });
    }

    public static async deletePoolEdge(): Promise<void> {
        ipcMain.handle('deletePoolEdge', async (event, brainstormId: string, edgeId: string) => {
            const result = await BrainstormController.deletePoolEdge(brainstormId, edgeId);
            return result;
        });
    }

    public static async getAllBrainstormByUser(): Promise<void> {
        ipcMain.handle('getAllBrainstormByUser', async (event, userId: string) => {
            const result = await BrainstormController.getAllBrainstormByUser(userId);
            return result;
        });
    }

    public static async getBrainstormById(): Promise<void> {
        ipcMain.handle('getBrainstormById', async (event, brainstormId: string) => {
            const result = await BrainstormController.getBrainstormById(brainstormId);
            return result;
        });
    }

    public static async getBrainstormPoolById(): Promise<void> {
        ipcMain.handle('getBrainstormPoolById', async (event, brainstormId: string) => {
            const result = await BrainstormController.getBrainstormPoolById(brainstormId);
            return result;
        });
    }
    
    public static async addPoolNodes(): Promise<void> {
        ipcMain.handle('addPoolNodes', async (event, brainstormId: string, node: BrainstormNode) => {
            const result = await BrainstormController.addPoolNodes(brainstormId, node);
            return result;
        });
    }

    public static async addPoolEdges(): Promise<void> {
        ipcMain.handle('addPoolEdges', async (event, brainstormId: string, edge: BrainstormEdge) => {
            const result = await BrainstormController.addPoolEdges(brainstormId, edge);
            return result;
        });
    }

}