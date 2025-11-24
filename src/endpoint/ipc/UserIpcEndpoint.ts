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

    public static async updateUser(){
        ipcMain.handle('updateUser', async (event, user) => {
            const result = await UserController.updateUser(user);
            console.log(result);
            return result;
        });
    }

    public static async deleteUser(){
        ipcMain.handle('deleteUser', async (event, id) => {
            const result = await UserController.deleteUser(id);
            console.log(result);
            return result;
        });
    }

    public static async getUserById(){
        ipcMain.handle('getUserById', async (event, id) => {
            const result = await UserController.getUserById(id);
            console.log(result);
            return result;
        }); 
    }

    public static async getAllUsers(){
        ipcMain.handle('getAllUsers', async (event) => {
            const result = await UserController.getAllUsers();
            console.log(result);
            return result;
        });
    }

    public static async getAiKey(){
        ipcMain.handle('getAiKey', async (event, id) => {
            const result = await UserController.getAiKey(id);
            console.log(result);
            return result;
        });
    }
}