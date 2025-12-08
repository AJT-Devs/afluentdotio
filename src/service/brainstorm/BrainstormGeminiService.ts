import { Brainstorm } from "../../entities/Brainstorm";
import { GoogleGenAI } from "@google/genai";
import { BrainstormServiceAdapter } from "./BrainstormServiceAdapter";


export default class BrainstormGeminiService implements BrainstormServiceAdapter {

    public async GenerateBrainstorm(brainstorm: Partial<Brainstorm>, apiKey: string, aiModelPreference: AiModels): Promise<string[][] | Error> {
        const ai = new GoogleGenAI({ apiKey: apiKey });
            try {
                const response = await ai.models.generateContent({
                    model: aiModelPreference,
                    contents: `Quero criar um brainstorm com o título ${brainstorm.name} e o contexto ${brainstorm.context}`,
                    config:{
                        "systemInstruction": "Sua única função é gerar palavras-chave. Responda APENAS com o resultado. O formato de cada item é: UMA_UNICA_PALAVRA sem espaços, um espaço em branco, e um número de 0 a 3. Itens são separados por vírgula. Exemplo: PalavraExemplo 0, OutraPalavra 1. É PROIBIDO usar mais de uma palavra por item. Gere palavras para todos os níveis de 0 a 3."
                    }
                });
                let content: string | undefined = response.text;
                if(!content){
                    return new Error("erro ao gerar palavras");
                }
                let lines = content.split(',');
                lines = lines.map(line => line.trim());
                let filter: Array<[string, number]> = lines.map(line => line.split(' ') as [string, number]);

                let words: string[][] = [];
                for(let i = 0; i<4; i++){
                    let level : string[] = [];
                    for(let x = 0; x<lines.length; x++){
                        if(filter[x][(filter[x].length-1)] == i){
                            level.push(filter[x][0]);
                        }               
                    }
                    words.push(level);
                }
                return words
            } catch (error) {
                throw new Error("erro ao gerar palavras");
            }
    }
}
