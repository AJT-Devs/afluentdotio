import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useConsole = () => {
    const [isFreeMode, setIsFreeMode] = useState<boolean>(true);

    const changeIsFreeMode = () => setIsFreeMode(!isFreeMode);
    const onAddWord = ()=>{}
    
    const navigate = useNavigate();
    const handleToBack = ()=>navigate("/dashboard")

    return {isFreeMode, changeIsFreeMode, onAddWord, handleToBack};
} 