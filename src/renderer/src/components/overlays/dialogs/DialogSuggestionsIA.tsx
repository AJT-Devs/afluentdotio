import DialogContent from "./Dialog";
import { useState, useEffect } from "react";
import {X} from "lucide-react";
import { ErrorModal } from "@renderer/components/modals/ErrorModal";
import AiIcon from '@renderer/components/AiIcon';

import "@renderer/assets/stylesheets/components/dialog-suggestions-ai.css"
import { button } from "motion/react-client";

interface DialogSuggestionsIAProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const DialogSuggestionsIA = ({open, onOpenChange, ...props}:DialogSuggestionsIAProps)=>{
    
    useEffect(()=>{

        // async function generateAIWords(){
        //     const brainstormId = sessionStorage.getItem("brainstormId");
        //     const userId = sessionStorage.getItem("userId");
    
        //     if(!userId){
        //         setErrorMessage("Usuario não logado!");
        //         return;
        //     }
        //     else if(!brainstormId){
        //         setErrorMessage("Usuario não logado!");
        //         return;
        //     }

        //     try{
        //         const brainstorm = await window.brainstorm.getBrainstormById(brainstormId);
        //         const aiKey = await window.user.getAiKey(userId);
        //         const aiModelPreference = window.user.getPreferenceAiModel(userId);
                
        //         const response = await window.brainstorm.generateAIWords(brainstorm, aiKey, aiModelPreference);
                
        //         //Tratar response para vir apenas um array simples

        //         //Codigo de tratamento
                
        //         //setWords(response);
        //     }
        //     catch(error){
        //         if(error instanceof Error){
        //             setErrorMessage(error.message);
        //         }
        //     }
        // }
    })

    const [words, setWords] = useState<string[]>(["Teste1", "Teste2"]);

    const [wordsSelect, setWordsSelect] = useState<string[]>([]);
    
    const [countSelect, setCountSelect] = useState(0);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const hadleAddSelectWord = (word : string) => {
        let words = wordsSelect;
        words?.push(word);
        setWordsSelect(words);
    }

    const hadleRemoveSelectWord = (word : string) => {
        let words : string[] = [];
        wordsSelect?.map((w)=>{
            if(w !== word) words.push(w);
        })
        setWordsSelect(words);
    }

    const GeneratedWords = words ? words.map((word)=>(
        <button onClick={(e)=>{
            let count = countSelect;
            if(!e.target.classList.contains("word-select")) {
                e.target.classList.add("word-select");
                e.target.blur();
                count++;
                setCountSelect(count);
                hadleAddSelectWord(e.target.innerText);
            }
            else{
                e.target.classList.remove("word-select");
                e.target.blur();
                count--;
                setCountSelect(count)
                hadleRemoveSelectWord(e.target.innerText);
            }
        }}>{word}</button>
    )) : "Nada gerado?";

    return(
        <div className="DialogSuggestionsIA">
            <DialogContent.Root>

                <DialogContent.Trigger className="ai-button" onClick={()=>{setCountSelect(0); setWordsSelect([]);}}>
                    <AiIcon/>
                </DialogContent.Trigger>

                <DialogContent.Content className="dialog-suggestions">
                    <DialogContent.Title className="title-dialog">Gerando Sugestões com IA</DialogContent.Title>
                    <div className="words-list">
                        {GeneratedWords}
                    </div>
                    <DialogContent.Close asChild>
                        <button className="btn-icon btn-x-icon">
                            <X className="icon" size={40}/> 
                        </button>
                    </DialogContent.Close>
                    <div className="footer-console-ai">
                        <p>{countSelect} Selecionado(s)</p>
                        <DialogContent.Close asChild>
                            <button id="btn-add-words" onClick={()=>{
                                console.log(wordsSelect)}
                            }>Adicionar</button>
                        </DialogContent.Close>
                    </div>
                </DialogContent.Content>

            </DialogContent.Root>
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
        </div>

    );
}

export default DialogSuggestionsIA;