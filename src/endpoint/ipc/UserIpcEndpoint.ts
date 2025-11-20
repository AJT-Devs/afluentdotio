import { ipcMain } from "electron";

import UserController from "../../controller/userController";

export class UserIpcEndpoints {
    public static async postUser(){
        ipcMain.handle('postUser', async (event, user) => {
            const result = await UserController.postUser(user);
            console.log(result);
            return result;
        });
        
    }
}