import Console from "@renderer/components/brainstorming/ConsoleBrainstorming";
import Pool2 from "@renderer/components/brainstorming/Pool2";
import {useConsole} from "@renderer/hooks/useConsole";
import { usePool } from '@renderer/hooks/usePool';
import Spinner from '@renderer/components/loadSpinner';
import { ErrorModal } from '../modals/ErrorModal';
import { useEffect } from "react";
import { useTheme } from "@renderer/contexts/ThemeContext";
const Brainstorm = ()=>{
    const {isFreeMode, changeIsFreeMode, handleToBack, handleDownload, title, setTitle} = useConsole();
    const { nodes, onNodesChange, loadBrainstorm, loading, error: errorMessage, setError: setErrorMessage, addWord, applyAutoLayout } = usePool();
    const { theme } = useTheme();
    
    useEffect(() => {
        loadBrainstorm();

        const carregarTitle = async () => {
            if(!sessionStorage.getItem('brainstormId')){
                console.warn('Brainstorm id not found in sessionStorage with key "brainstormId"');
            }
            try{
                const idBrainstorm = sessionStorage.getItem('brainstormId');
                if(!idBrainstorm) setErrorMessage('Brainstorm ID não existe.');
                
                const response =  await window.brainstorm.getBrainstormById(idBrainstorm!);
                
                if(response){
                    setTitle(response.data.name);
                }
            }
            catch(error){
                if(error instanceof Error){
                    setErrorMessage('Erro ao carregar brainstorm: ' + error.message);
                }
            }
    }
    carregarTitle();
    }, [loadBrainstorm]);
    
    // Wrapper: quando sair do modo livre (true -> false), recalcula layout
    const handleToggleFreeMode = () => {
        if (isFreeMode) {
            // Vai desativar → aplica autolayout (recalcula range e força posição)
            applyAutoLayout();
        }
        changeIsFreeMode();
    };

    if(!sessionStorage.getItem('userPhoto')){
        console.warn('User photo not found in sessionStorage with key "userPhoto"');
    }
    
    const iconUser = sessionStorage.getItem('userPhoto');

    return(
        <>
            <Pool2 isFreeMode={isFreeMode} nodes={nodes} onNodesChange={onNodesChange}>
                <Console 
                    isFreeMode={isFreeMode} 
                    changeIsFreeMode={handleToggleFreeMode} 
                    onAddWord={addWord}
                    handleToBack={handleToBack}
                    addWordsGeneratedAI={(words)=>words.forEach(word=>addWord(word))}
                    exportDoc={()=>handleDownload({
                        nodes,
                        width: 1920,
                        height: 1200,
                        fileName: title.replace(/\s+/g, '_').toLowerCase() + '_brainstorm.png',
                        backgroundColor: `${ theme === 'light' ? '#E5E7EF' : '#202124' }`,
                        minZoom: 2,
                        maxZoom: 2,
                        padding: 0,
                    })}
                    icon={iconUser || ""}
                    title={title}
                />
            </Pool2>
            {loading && <Spinner/>}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)}/>}
        </>
    );
}

export default Brainstorm;