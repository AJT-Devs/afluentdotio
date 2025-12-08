import DialogContent from "./Dialog";
import { useState, useEffect, Suspense, useRef } from "react";
import {X} from "lucide-react";
import { ErrorModal } from "@renderer/components/modals/ErrorModal";
import AiIcon from '@renderer/components/AiIcon';

import "@renderer/assets/stylesheets/components/dialog-suggestions-ai.css"
import Spinner from "@renderer/components/loadSpinner";

const DialogSuggestionsIA = ()=>{
    const hasFetched = useRef<Boolean>(false);

    

    const getAiWords = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            try{
                const brainstormId = sessionStorage.getItem("brainstormId");
                const userId = sessionStorage.getItem("userId");
                if(!userId){
                    setErrorMessage("Erro ao buscar id do usuario!");
                    return;
                }
                if(!brainstormId){
                    setErrorMessage("Erro ao buscar id do brainstorm!");
                    return;
                }
                const brainstormData = await window.brainstorm.getBrainstormById(brainstormId);
                if(brainstormData instanceof Error){
                    setErrorMessage(brainstormData.message);
                    return;
                }
                const aiKey = await window.user.getAiKey(userId);
                if(aiKey instanceof Error){
                    setErrorMessage(aiKey.message);
                    return;
                }
                const aiModelPreference = await window.user.getPreferenceAiModel(userId);
                if(aiModelPreference instanceof Error){
                    setErrorMessage(aiModelPreference.message);
                    return;
                }
                const AIWords = await window.brainstorm.generateAIWords(
                    brainstormData.data, 
                    aiKey.data.aikey, 
                    aiModelPreference.data.preferenceaimodel
                );
                if(AIWords instanceof Error){
                    setErrorMessage(AIWords.message);
                    return;
                }
    
                setWords(AIWords.data.flat());
            }catch(error){
                if(error instanceof Error){
                    setErrorMessage(error.message);
                    return;
                }
                setErrorMessage("Erro ao gerar palavras com IA.");
                return;
            }
        };

    const [words, setWords] = useState<string[]>([]);

    const [wordsSelect, setWordsSelect] = useState<string[]>([]);
    
    const [countSelect, setCountSelect] = useState(0);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const hadleAddSelectWord = (word : string) => {
        setWordsSelect(prev => [...prev, word]);
    }

    const hadleRemoveSelectWord = (word : string) => {
        setWordsSelect(prev => prev.filter(w => w !== word));
    }

    const GeneratedWords = words.length > 0 ? words.map((word, index)=>(
        <button key={index} className="word-generated-ai" onClick={(e)=>{
            const target = e.currentTarget;
            let count = countSelect;
            if(!target.classList.contains("word-select")) {
                target.classList.add("word-select");
                target.blur();
                count++;
                setCountSelect(count);
                hadleAddSelectWord(target.innerText);
            }
            else{
                target.classList.remove("word-select");
                target.blur();
                count--;
                setCountSelect(count)
                hadleRemoveSelectWord(target.innerText);
            }
        }}>{word}</button>
    )) : <p>Carregando sugestões...</p>;

    return(
        <Suspense fallback={<Spinner />} >
            <div className="DialogSuggestionsIA">
                <DialogContent.Root>

                    <DialogContent.Trigger className="ai-button" onClick={()=>{setCountSelect(0); setWordsSelect([]); setIsOpen(true); getAiWords();}}>
                        <AiIcon/>
                    </DialogContent.Trigger>

                    <DialogContent.Content className="dialog-suggestions">
                        <DialogContent.Title className="title-dialog">Gerando Sugestões com IA</DialogContent.Title>
                        <div className="words-list">
                            {GeneratedWords}
                        </div>
                        <DialogContent.Close asChild>
                            <button className="btn-icon btn-x-icon" onClick={()=>{setIsOpen(false); hasFetched.current = false;}}>
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
        </Suspense>

    );
}

export default DialogSuggestionsIA;