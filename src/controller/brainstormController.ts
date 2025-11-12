import { Brainstorm } from '../entities/Brainstorm';
import { SuccessResponse } from '../entities/SuccessResponse';
import BrainstormGeminiService from '../service/brainstorm/BrainstormGeminiService';
import { PrismaBrainstormModel } from '../models/brainstorm/PrismaBrainstormModel';
import { PrismaErrorLogModel } from '../models/errorLog/PrismaErrorLogModel';
import { BrainstormModelAdapter } from '../models/brainstorm/BrainstormModelAdapter';
import { ErrorLogModelAdapter } from '../models/errorLog/ErrorLogModelAdapter';
import { BrainstormServiceAdapter } from '../service/brainstorm/BrainstormServiceAdapter';
export default class BrainstormController {
    private static BrainstormModel: BrainstormModelAdapter = new PrismaBrainstormModel();
    private static ErrorLogModel: ErrorLogModelAdapter = new PrismaErrorLogModel();
    private static BrainstormService: BrainstormServiceAdapter = new BrainstormGeminiService();

    public static async generateAIWords(brainstorm: Brainstorm, apiKey: string, aiModelPreference: AiModels): Promise<SuccessResponse | Error > {
        try{
            const words = await this.BrainstormService.GenerateBrainstorm(brainstorm, apiKey, aiModelPreference);
            return new SuccessResponse(200, "Palavras geradas com sucesso", words);

        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao gerar palavras com IA");
        }
    }
    
    public static async postBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse | Error> {
        try{
            const response = await this.BrainstormModel.createBrainstorm(brainstorm);

            return new SuccessResponse(201, "Brainstorm salvo com sucesso", response);

        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao salvar brainstorm");
        }
    }

    public static async updateBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse | Error> {
        try{
            const response = await this.BrainstormModel.updateBrainstorm(brainstorm);
            return new SuccessResponse(200, "Brainstorm atualizado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar brainstorm");
        }
    }

    public static async deleteBrainstorm(id: string): Promise<SuccessResponse | Error> {
        try{
            const response = await this.BrainstormModel.deleteBrainstorm(id);
            return new SuccessResponse(200, "Brainstorm deletado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar brainstorm");
        }
    }

    public static async getBrainstormById(id: string): Promise<SuccessResponse | Error> {
        try{
            const response = await this.BrainstormModel.getBrainstormById(id);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Brainstorm encontrado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorm");
        }
    }

    public static async getAllBrainstorms(userId: string): Promise<SuccessResponse | Error> {
        try{
            const response = await this.BrainstormModel.getAllBrainstormByUser(userId);
            return new SuccessResponse(200, `Brainstorms do usuário id: ${userId}`, response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorms");
        }
    }

}