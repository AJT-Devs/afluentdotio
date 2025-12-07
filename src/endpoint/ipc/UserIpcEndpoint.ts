import { ipcMain } from "electron";

import UserController from "../../controller/userController";
import { User } from "../../entities/User";

export class UserIpcEndpoints {
    public static async postUser(){
        ipcMain.handle('postUser', async (event, user: User) => {
            const result = await UserController.postUser(user);
            return result;
        });
    }

    public static async updateUser(){
        ipcMain.handle('updateUser', async (event, user: User) => {
            const result = await UserController.updateUser(user);
            return result;
        });
    }

    public static async deleteUser(){
        ipcMain.handle('deleteUser', async (event, id: string) => {
            const result = await UserController.deleteUser(id);
            return result;
        });
    }

    public static async getUserById(){
        ipcMain.handle('getUserById', async (event, id: string) => {
            const result = await UserController.getUserById(id);
            return result;
        }); 
    }

    public static async getAllUsers(){
        ipcMain.handle('getAllUsers', async (event) => {
            const result = await UserController.getAllUsers();
            return result;
        });
    }

    public static async getAiKey(){
        ipcMain.handle('getAiKey', async (event, id: string) => {
            const result = await UserController.getAiKey(id);
            return result;
        });
    }

    public static async getPreferenceAiModel(){
        ipcMain.handle('getPreferenceAiModel', async (event, id: string) => {
            const result = await UserController.getPreferenceAiModel(id);
            return result;
        });
    }
}