import { Brainstorm } from "../entities/Brainstorm";
import { createBrainstorm } from "../models/brainstormModel";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";


export async function generateBrainstorm(brainstorm: Brainstorm){
    
    try{
        await createBrainstorm(brainstorm);
        const words = await GenerateWords(brainstorm);
        console.log(words)
        return words;
    }catch(error){
        return error
    }
    
}

async function GenerateWords(brainstorm: Brainstorm){
    dotenv.config();
    const ai = new GoogleGenAI({});
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Quero criar um brainstorm com o título ${brainstorm.name} e o contexto ${brainstorm.context}`,
            config:{
                "systemInstruction": "Sua única função é gerar palavras-chave. Responda APENAS com o resultado. O formato de cada item é: UMA_UNICA_PALAVRA sem espaços, um espaço em branco, e um número de 0 a 3. Itens são separados por vírgula. Exemplo: PalavraExemplo 0, OutraPalavra 1. É PROIBIDO usar mais de uma palavra por item. Gere palavras para todos os níveis de 0 a 3."
            }
        });
        let content: any = response.text;
        let lines = content.split(',');
        lines = lines.map(line => line.trim());
        let filter:any = lines.map(line => line.split(' '));

        let words: any = [];
        for(let i = 0; i<4; i++){
            let level : any = [];
            for(let x = 0; x<lines.length; x++){
                if(filter[x][1] == i){
                    level.push(filter[x][0]);
                }               
            }
            words.push(level);
        }
        return words
    } catch (error) {
        return error
    }
}