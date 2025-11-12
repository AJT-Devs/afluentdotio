import { Brainstorm } from "../../entities/Brainstorm";

export interface BrainstormServiceAdapter {
    GenerateBrainstorm(brainstorm: Brainstorm, apiKey: string, aiModelPreference: AiModels): Promise<string[][] | Error>
}