import { ipcMain } from "electron";

import BrainstormController from "../../controller/brainstormController";

export class BrainstormIpcEndpoint {
    public static async postBrainstorm(): Promise<void> {
        ipcMain.handle('postBrainstorm', async (event, brainstorm) => {
            const result = await BrainstormController.postBrainstorm(brainstorm);
            console.log(result);
            return result;
        });
    }

    public static async updateBrainstorm(): Promise<void> {
        ipcMain.handle('updateBrainstorm', async (event, brainstorm) => {
            const result = await BrainstormController.updateBrainstorm(brainstorm);
            console.log(result);
            return result;
        });
    }

    public static async getBrainstormById(): Promise<void> {
        ipcMain.handle('getBrainstormById', async (event, brainstormId) => {
            const result = await BrainstormController.getBrainstormById(brainstormId);
            console.log(result);
            return result;
        });
    }
}