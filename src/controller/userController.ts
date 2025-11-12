import { User } from '../entities/User';
import { SuccessResponse } from '../entities/SuccessResponse';
import { PrismaUserModel } from '../models/user/PrismaUserModel';
import { PrismaErrorLogModel } from '../models/errorLog/PrismaErrorLogModel';
import { UserModelAdapter } from '../models/user/UserModelAdapter';
import { ErrorLogModelAdapter } from '../models/errorLog/ErrorLogModelAdapter';


export default class UserController {
    private static UserModel: UserModelAdapter = new PrismaUserModel();
    private static ErrorLogModel: ErrorLogModelAdapter = new PrismaErrorLogModel();

    public static async postUser(user: User): Promise<SuccessResponse | Error> {
        try{
            const User = await this.UserModel.createUser(user);
            return new SuccessResponse(201, "Usuário criado com sucesso", User);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao criar usuário");
        }
    }
    
    public static async updateUser(user: User): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await this.UserModel.updateUser(user);
            return new SuccessResponse(200, "Usuário atualizado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar usuário");
        }
    }

    public static async deleteUser(id: string): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await this.UserModel.deleteUser(id);
            return new SuccessResponse(200, "Usuário deletado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar usuário");
        }
    }
    public static async getUserById(id: string): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await this.UserModel.getUserById(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }

            return new SuccessResponse(200, "Usuário encontrado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar usuário");
        }
    }

    public static async getAllUsers(): Promise<SuccessResponse | Error> {
        try{
            const users = await this.UserModel.getAllUsers();
            return new SuccessResponse(200, "Usuários encontrados com sucesso", users);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar usuários");
        }
    }

    public static async getAiKey(id: string): Promise<SuccessResponse | Error> {
        try{
            const userResponse = await this.UserModel.getAiKey(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }

            return new SuccessResponse(200, "Chave AI encontrada com sucesso", {aikey: userResponse});
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar chave AI");
        }   
    }
}