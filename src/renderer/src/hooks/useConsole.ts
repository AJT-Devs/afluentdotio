import { useState } from "react";



export const useConsole = () => {
    const [isFreeMode, setIsFreeMode] = useState<boolean>(false);
    const changeIsFreeMode = () => setIsFreeMode(!isFreeMode);

    const onAddWord = ()=>{}
    const handleToBack = ()=>{}

    return {isFreeMode, changeIsFreeMode, onAddWord, handleToBack};
} 