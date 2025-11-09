import { Word } from "../entities/Word";
import { ErrorLogModel } from "../models/errorLogModel";
import { WordModel } from "../models/wordModel";
import { SuccessResponse } from "../entities/SuccessResponse";


export default class WordController {
    public static async postWord(word: Word): Promise<SuccessResponse | Error> {
        try{
            const response = await WordModel.createWord(word);
            return new SuccessResponse(201, "Palavra salvas com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao salvar palavra");
        }
    }
    public static async postManyWords(words: Word[]): Promise<SuccessResponse | Error> {
        try{
            const response = await Promise.all(words.map(async (word) => {
                const response =  await WordModel.createWord(word);
                return response;
            }));
            return new SuccessResponse(201, "Palavras salvas com sucesso", response);

        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao salvar palavras");
        }
    }

    public static async putWord(word: Word): Promise<SuccessResponse | Error> {
        try{
            const response = await WordModel.updateWord(word);
            return new SuccessResponse(200, "Palavra atualizada com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao atualizar palavra");
        }
    }

    public static async deleteWord(id: string): Promise<SuccessResponse | Error> {
        try{
            const response = await WordModel.deleteWord(id);
            return new SuccessResponse(200, "Palavra deletada com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao deletar palavra");
        }
    }

    public static async getWordById(id: string): Promise<SuccessResponse | Error> {
        try{
            const response = await WordModel.getWordById(id);
            if(!response){
                return new SuccessResponse(404, "Palavra não encontrada", {});
            }
            return new SuccessResponse(200, "Palavra encontrada com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar palavra");
        }
    }

    public static async getAllWordsByBrainstorm(brainstormId: string): Promise<SuccessResponse | Error> {
        try{
            const response = await WordModel.getAllWordByBrainstorm(brainstormId);
            return new SuccessResponse(200, "Palavras encontradas com sucesso", response);
        }catch(error){
            await ErrorLogModel.createErrorLog({message: JSON.stringify(error)} as any);
            return new Error("Erro ao buscar palavras");
        }
    }

}