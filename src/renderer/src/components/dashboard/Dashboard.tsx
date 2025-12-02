import { CircleUserRound, Bolt, Search, List, Grid2X2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect, Key } from "react";

import '@renderer/assets/stylesheets/components/dashboard/dashboard.css';
import { Brainstorm } from "src/entities/Brainstorm";
import { ErrorModal } from "../modals/ErrorModal";
import { error } from "console";



export default function Dashboard(){
    
    const navigate = useNavigate();
    const handleCriar = ()=> {
        return navigate("/introduction");
    }
    const handleVoltar = ()=>{
        return navigate("/login");
    }

    const [typeListNavSelected, setTypeListNavSelected] = useState<Key>('grid');
    const [brainstormList, setBrainstormList] = useState<Brainstorm[]>([]);

    const [errorMessage, setErrorMessage] = useState<string | null> (null);

    useEffect(() => {
        const getBrainstormList = async () => {
            try{}catch(error){
                setErrorMessage("Erro inesperado");
            }
        }
    },[]);

    return (
        <>
        <header className="dashboard-header">
            <CircleUserRound size={60} className="icon" onClick={handleVoltar}/>
            <div className="search-header">
                <input type="text" placeholder="Busque..." className="search-input" />
                <div className="icon-search"><Search size={30} /></div>
            </div>
            <button onClick={handleCriar}>CRIAR</button>
            <Bolt size={50} className="icon"/>
        </header>
        <nav>
            <p>Meus Brainstorms</p>
            <div className="div-type-list-nav">
                <Grid2X2 key={'grid'} size={35} className={`icon type-list-nav ${typeListNavSelected == 'grid'? 'type-list-nav-selected' : ''}`} onClick={()=>{setTypeListNavSelected('grid')}} />
                <List key={'list'} size={35} className={`icon type-list-nav ${typeListNavSelected == 'list'? 'type-list-nav-selected' : ''}`} onClick={()=>{setTypeListNavSelected('list')}} />
            </div>
        </nav>
        <main>
            
            
        </main>
        {errorMessage && <ErrorModal message={errorMessage} onClose={()=> setErrorMessage(null)} /> }
        </>
    );
}