import { CircleUserRound, Bolt, Search, List, Grid2X2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect, Key, useRef } from "react";

import '@renderer/assets/stylesheets/components/dashboard/dashboard.css';
import { Brainstorm } from "src/entities/Brainstorm";
import { ErrorModal } from "../modals/ErrorModal";
import { SuccessResponse } from "src/entities/SuccessResponse";



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
    const [brainstormId, setBrainstormId] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string | null> (null);

    const hasFetchedBrainstorms = useRef<Boolean>(false);

    useEffect(() => {
        if(hasFetchedBrainstorms.current){
            return;
        }
        hasFetchedBrainstorms.current = true;
        const getBrainstormList = async () => {
            try{
                const userId = sessionStorage.getItem('userId') || '';

                const response: SuccessResponse | Error = await window.brainstorm.getAllBrainstormByUser(userId);
                console.log(response);
                if(response instanceof Error) {
                    setErrorMessage(response.message);
                    return;
                }
                response.data.map((brainstorm: Brainstorm) => {
                    setBrainstormList((prevList) => [...prevList, brainstorm]);
                })
            }catch(error){
                setErrorMessage("Erro inesperado");
            }
        }
        getBrainstormList();
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
            {   brainstormList.length > 0 &&
                brainstormList.map((brainstorm)=>(
                    <button key={brainstorm.id} className="brainstorm-card" tabIndex={0} onClick={() => {setBrainstormId(brainstorm.id)} }>            
                        <h2 title={brainstorm.name}>{brainstorm.name.length > 5 ? brainstorm.name.slice(0, 5) + "..." : brainstorm.name}</h2>
                    </button>
                ))
            }
            { brainstormList.length <= 0 && <p>Nenhum brainstorm encontrado.</p> }
        </main>
        {errorMessage && <ErrorModal message={errorMessage} onClose={()=> setErrorMessage(null)} /> }
        </>
    );
}