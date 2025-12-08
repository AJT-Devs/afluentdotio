import Console from "@renderer/components/brainstorming/ConsoleBrainstorming";
import Pool2 from "@renderer/components/brainstorming/Pool2";
import {useConsole} from "@renderer/hooks/UseConsole";
const Brainstorm = ()=>{
    const {isFreeMode, changeIsFreeMode, onAddWord, handleToBack} = useConsole();

    return(
        <>
            <Pool2 isFreeMode={isFreeMode}>
                <Console 
                    isFreeMode={isFreeMode} 
                    changeIsFreeMode={changeIsFreeMode} 
                    onAddWord={onAddWord}
                    handleToBack={handleToBack}
                />
            </Pool2>
        </>
    );
}

export default Brainstorm;