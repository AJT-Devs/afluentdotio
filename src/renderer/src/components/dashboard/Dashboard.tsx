import { CircleUserRound, Bolt, Search} from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router";

import '@renderer/assets/stylesheets/components/dashboard/dashboard.css';



export default function Dashboard(){
    const navigate = useNavigate();
    const handleCriar = ()=> {
        return navigate("/introduction");
    }

    return (
        <header className="dashboard-header">
            <CircleUserRound size={60} className="icon" />
            <div className="search-header">
                <input type="text" placeholder="Busque..." className="search-input" />
                <div className="icon-search"><Search size={30} /></div>
            </div>
            <button onClick={handleCriar}>CRIAR</button>
            <Bolt size={50} className="icon"/>
        </header>
    );
}