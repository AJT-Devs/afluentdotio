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
                systemInstruction: "você é um gerador de palavras chaves, responde apenas com palavras chaves únicas (exemplo: palavra 0), sem cabeçalho, sem explicação, com um espaço e um número inteiro indicando o nível de proximidade com o assunto, que vai de 0 a 3, quanto menor o numero, maior a proximidade. São separadas por vírgula. Dê palavras de todos os níveis"
            }
        });
        console.log(response.text)
        let content: any = response.text;
        let lines = content.split(',');
        lines = lines.map(line => line.trim());
        let filter:any = lines.map(line => line.split(' '));

        let words: any = [];
        let index = 0
        for(let i = 0; i<4; i++){
            let level : any = [];
            for(let x = index; x<lines.length; x++){
                if(filter[x][1] == i){
                    level.push(filter[x][0]);
                    index++;
                    continue;
                }
                break;
            }
            words.push(level);
        }
        return words
    } catch (error) {
        return error
    }
}