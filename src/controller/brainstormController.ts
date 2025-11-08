import { Brainstorm } from '../entities/Brainstorm';
import BrainstormService from '../service/brainstormService';

export default class BrainstormController {
    public static async generateBrainstorm(brainstorm: Brainstorm, apiKey: string): Promise<any> {
        const words: string[][] | Error = await BrainstormService.GenerateBrainstorm(brainstorm, apiKey);
        if(words instanceof Error){
            return words
        }
        
    }
    
}