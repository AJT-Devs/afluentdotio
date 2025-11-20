import { ipcMain } from "electron";

import BrainstormController from "../../controller/brainstormController";

export class BrainstormIpcEndpoint {
    public static async postBrainstorm(){
        ipcMain.handle('postBrainstorm', async (event, brainstorm) => {
            const result = await BrainstormController.postBrainstorm(brainstorm);
            console.log(result);
            return result;
        });
    }
        
}