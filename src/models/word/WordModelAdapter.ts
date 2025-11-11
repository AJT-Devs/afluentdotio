import { Word } from "../../entities/Word";

export interface WordModelAdapter {
    createWord(word: Word): Promise<Word>;
    updateWord(word: Word): Promise<Word>;
    deleteWord(id: string): Promise<Word>;
    getWordById(id: string): Promise<Word | null>;
    getAllWordByBrainstorm(brainstormId: string): Promise<Word[]>;
}