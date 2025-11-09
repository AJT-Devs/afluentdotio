import { Brainstorm } from '../entities/Brainstorm';
import { SuccessResponse } from '../entities/SuccessResponse';
import BrainstormService from '../service/brainstormService';
import { ErrorLogModel } from '../models/errorLogModel';
import { BrainstormModel } from '../models/brainstormModel';
export default class BrainstormController {
    public static async generateAIWords(brainstorm: Brainstorm, apiKey: string): Promise<SuccessResponse | Error > {
        try{
            const words = await BrainstormService.GenerateBrainstorm(brainstorm, apiKey);
            return new SuccessResponse(200, "Palavras geradas com sucesso", words);

        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao gerar palavras com IA");
        }
    }
    
    public static async postBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse | Error> {
        try{
            const response = await BrainstormModel.createBrainstorm(brainstorm);

            return new SuccessResponse(201, "Brainstorm salvo com sucesso", response);

        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao salvar brainstorm");
        }
    }

    public static async updateBrainstorm(brainstorm: Brainstorm): Promise<SuccessResponse | Error> {
        try{
            const response = await BrainstormModel.updateBrainstorm(brainstorm);
            return new SuccessResponse(200, "Brainstorm atualizado com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar brainstorm");
        }
    }

    public static async deleteBrainstorm(id: string): Promise<SuccessResponse | Error> {
        try{
            const response = await BrainstormModel.deleteBrainstorm(id);
            return new SuccessResponse(200, "Brainstorm deletado com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar brainstorm");
        }
    }

    public static async getBrainstormById(id: string): Promise<SuccessResponse | Error> {
        try{
            const response = await BrainstormModel.getBrainstormById(id);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Brainstorm encontrado com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorm");
        }
    }

    public static async getAllBrainstorms(userId: string): Promise<SuccessResponse | Error> {
        try{
            const response = await BrainstormModel.getAllBrainstormByUser(userId);
            return new SuccessResponse(200, `Brainstorms do usuário id: ${userId}`, response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorms");
        }
    }

}