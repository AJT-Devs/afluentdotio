import { User } from '../entities/User';
import { SuccessResponse } from '../entities/SuccessResponse';
import { UserModelAdapter } from '../models/user/UserModelAdapter';
import { ErrorLogModelAdapter } from '../models/errorLog/ErrorLogModelAdapter';

import { PrismaErrorLogModel } from '../models/errorLog/PrismaErrorLogModel';
import mongooseErrorLogModel from '../models/errorLog/MongooseErrorLogModel';

import { PrismaUserModel } from '../models/user/PrismaUserModel';
import MongooseUserModel from '../models/user/MongooseUserModel';

export default class UserController {
    // private static UserModel: UserModelAdapter = new PrismaUserModel();
    // private static ErrorLogModel: ErrorLogModelAdapter = new PrismaErrorLogModel();
    private static UserModel: UserModelAdapter = new MongooseUserModel();
    private static ErrorLogModel: ErrorLogModelAdapter = new mongooseErrorLogModel();

    public static async postUser(user: User): Promise<SuccessResponse<Partial<User>> | Error> {
        try{
            const userResponse: Partial<User> = await this.UserModel.createUser(user);
            return new SuccessResponse(201, "Usuário criado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao criar usuário");
        }
    }
    
    public static async updateUser(user: User): Promise<SuccessResponse<User> | Error> {
        try{
            const userResponse: User | null = await this.UserModel.updateUser(user);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }
            return new SuccessResponse(200, "Usuário atualizado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar usuário");
        }
    }

    public static async deleteUser(id: string): Promise<SuccessResponse<User> | Error> {
        try{
            const userResponse: User | null = await this.UserModel.deleteUser(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }
            return new SuccessResponse(200, "Usuário deletado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar usuário");
        }
    }
    public static async getUserById(id: string): Promise<SuccessResponse<Partial<User>> | Error> {
        try{
            const userResponse: Partial<User> | null = await this.UserModel.getUserById(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }

            return new SuccessResponse(200, "Usuário encontrado com sucesso", userResponse);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar usuário");
        }
    }

    public static async getAllUsers(): Promise<SuccessResponse<Partial<User>[]> | Error> {
        try{
            const users: Partial<User>[] = await this.UserModel.getAllUsers();
            return new SuccessResponse(200, "Usuários encontrados com sucesso", users);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar usuários");
        }
    }

    public static async getAiKey(id: string): Promise<SuccessResponse<Partial<User>> | Error> {
        try{
            const userResponse:  string | null = await this.UserModel.getAiKey(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }

            return new SuccessResponse(200, "Chave AI encontrada com sucesso", {aikey: userResponse});
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar chave AI");
        }   
    }

    public static async getPreferenceAiModel(id: string): Promise<SuccessResponse<Partial<User>> | Error> {
        try{
            const userResponse:  string | null = await this.UserModel.getPreferenceAiModel(id);
            if(!userResponse){
                return new SuccessResponse(404, "Usuário não encontrado", {});
            }
            return new SuccessResponse(200, "Modelo AI encontrado com sucesso", {preferenceaimodel: userResponse});
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar modelo AI ");
        }
    }
}