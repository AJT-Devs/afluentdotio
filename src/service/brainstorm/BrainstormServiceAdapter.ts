import { Brainstorm } from "../../entities/Brainstorm";

export interface BrainstormServiceAdapter {
    GenerateBrainstorm(brainstorm: Partial<Brainstorm>, apiKey: string, aiModelPreference: AiModels): Promise<string[][] | Error>
}