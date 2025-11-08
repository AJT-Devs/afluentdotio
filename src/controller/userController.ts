import { User } from '../entities/User';
import { UserModel } from '../models/userModel';
import { ErrorLogModel } from '../models/errorLogModel';
import { SuccessResponse } from '../entities/SuccessResponse';


export default class UserController {
    public static async postUser(user: User): Promise<SuccessResponse | Error> {
        try{
            const User = await UserModel.createUser(user);
            return new SuccessResponse(201, "Usuário criado com sucesso", User);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao criar usuário");
        }
    }
    
    public static async updateUser(user: User): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await UserModel.updateUser(user);
            return new SuccessResponse(200, "Usuário atualizado com sucesso", userResponse);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar usuário");
        }
    }

    public static async deleteUser(id: string): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await UserModel.deleteUser(id);
            return new SuccessResponse(200, "Usuário deletado com sucesso", userResponse);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar usuário");
        }
    }
    public static async getUserById(id: string): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await UserModel.getUserById(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }

            return new SuccessResponse(200, "Usuário encontrado com sucesso", userResponse);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar usuário");
        }
    }

    public static async getAllUsers(): Promise<SuccessResponse | Error> {
        try{
            const users = await UserModel.getAllUsers();
            return new SuccessResponse(200, "Usuários encontrados com sucesso", users);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar usuários");
        }
    }

    public static async getAiKey(id: string): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await UserModel.getAiKey(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }

            return new SuccessResponse(200, "Chave AI encontrada com sucesso", {aikey: userResponse});
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar chave AI");
        }   
    }
}