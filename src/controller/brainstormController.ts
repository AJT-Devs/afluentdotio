import { Brainstorm, Viewport, BrainstormNode, BrainstormEdge } from '../entities/Brainstorm';
import { SuccessResponse } from '../entities/SuccessResponse';
import BrainstormGeminiService from '../service/brainstorm/BrainstormGeminiService';

import MongooseBrainstormModel from '../models/brainstorm/MongooseBrainstormModel';
import MongooseErrorLogModel from '../models/errorLog/MongooseErrorLogModel';

import { BrainstormModelAdapter } from '../models/brainstorm/BrainstormModelAdapter';
import { ErrorLogModelAdapter } from '../models/errorLog/ErrorLogModelAdapter';
import { BrainstormServiceAdapter } from '../service/brainstorm/BrainstormServiceAdapter';
export default class BrainstormController {
    private static BrainstormModel: BrainstormModelAdapter = new MongooseBrainstormModel();
    private static ErrorLogModel: ErrorLogModelAdapter = new MongooseErrorLogModel();
    private static BrainstormService: BrainstormServiceAdapter = new BrainstormGeminiService();

    public static async generateAIWords(brainstorm: Brainstorm, apiKey: string, aiModelPreference: AiModels): Promise<SuccessResponse | Error > {
        try{
            const words: string[][] | Error = await this.BrainstormService.GenerateBrainstorm(brainstorm, apiKey, aiModelPreference);
            if(words instanceof Error){
                await this.ErrorLogModel.createErrorLog({message: JSON.stringify(words)} as any);
                return new Error("Erro ao gerar palavras com IA");
            }
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
            const response : Brainstorm | null = await this.BrainstormModel.updateBrainstorm(brainstorm);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Brainstorm atualizado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar brainstorm");
        }
    }

    public static async updateViewport(brainstormId: string, viewport: Viewport): Promise<SuccessResponse | Error> {
        try{
            const response : Partial<Brainstorm> | null = await this.BrainstormModel.updateViewport(brainstormId, viewport);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Viewport atualizado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar viewport");
        }
    }

    public static async updatePoolNode(brainstormId: string, node: BrainstormNode): Promise<SuccessResponse | Error> {
        try{
            const response : Partial<Brainstorm> | null = await this.BrainstormModel.updatePoolNode(brainstormId, node);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Pool node atualizado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar pool node");
        }
    }
    public static async updatePoolEdge(brainstormId: string, edge: BrainstormEdge): Promise<SuccessResponse | Error> {
        try{
            const response : Partial<Brainstorm> | null = await this.BrainstormModel.updatePoolEdge(brainstormId, edge);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Pool edge atualizado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar pool edge");
        }
    }

    public static async deleteBrainstorm(id: string): Promise<SuccessResponse | Error> {
        try{
            const response: Brainstorm | null = await this.BrainstormModel.deleteBrainstorm(id);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Brainstorm deletado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar brainstorm");
        }
    }

    public static async deletePoolNode(brainstormId: string, nodeId: string): Promise<SuccessResponse | Error> {
        try{
            const response: Partial<Brainstorm> | null = await this.BrainstormModel.deletePoolNode(brainstormId, nodeId);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Pool node deletado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar pool node");
        }
    }

    public static async deletePoolEdge(brainstormId: string, edgeId: string): Promise<SuccessResponse | Error> {
        try{
            const response: Partial<Brainstorm> | null = await this.BrainstormModel.deletePoolEdge(brainstormId, edgeId);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Pool edge deletado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar pool edge");
        }
    }

    public static async getBrainstormById(id: string): Promise<SuccessResponse | Error> {
        try{
            const response: Brainstorm | null = await this.BrainstormModel.getBrainstormById(id);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Brainstorm encontrado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorm");
        }
    }

    public static async getAllBrainstormByUser(userId: string): Promise<SuccessResponse | Error> {
        try{
            const response: Brainstorm[] = await this.BrainstormModel.getAllBrainstormByUser(userId);
            return new SuccessResponse(200, `Brainstorms do usuário id: ${userId}`, response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorms");
        }
    }

    public static async getBrainstormPoolById(brainstormId: string): Promise<SuccessResponse | Error> {
        try{
            const response: Partial<Brainstorm> | null = await this.BrainstormModel.getBrainstormPoolById(brainstormId);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(200, "Brainstorm pool encontrado com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar brainstorm pool");
        }
    }

    public static async addPoolNodes(brainstormId: string, node: BrainstormNode): Promise<SuccessResponse | Error> {
        try{
            const response : Partial<Brainstorm> | null = await this.BrainstormModel.pushToPoolNodes(brainstormId, node);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(201, "Node adicionado ao pool com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao adicionar node ao pool");
        }
    }

    public static async addPoolEdges(brainstormId: string, edge: BrainstormEdge): Promise<SuccessResponse | Error> {
        try{
            const response : Partial<Brainstorm> | null = await this.BrainstormModel.pushToPoolEdges(brainstormId, edge);
            if(!response){
                return new SuccessResponse(404, "Brainstorm não encontrado", {});
            }
            return new SuccessResponse(201, "Edge adicionado ao pool com sucesso", response);
        }catch(error: unknown){
            await this.ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao adicionar edge ao pool");
        }
    }
}