import { Brainstorm } from '../entities/Brainstorm';
import BrainstormService from '../service/BrainstormService';

export default class BrainstormController {
    public static async createBrainstorm(brainstorm: Brainstorm, apiKey: string): Promise<any> {
        const words: string[][] | Error = await BrainstormService.GenerateWords(brainstorm, apiKey);
        if(words instanceof Error){
            return words
        }
        
    }
    
}