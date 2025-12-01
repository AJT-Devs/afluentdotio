import { CircleUserRound, Bolt, Search} from "lucide-react";
import '../../assets/stylesheets/components/dashboard/dashboard.css';
import { NavigateFunction, useNavigate } from "react-router";



export default function Dashboard(){
    const navigate = useNavigate();
    const handleCriar = ()=> {
        return navigate("/introduction");
    }

    return (
        <>
            <header className="dashboard-header">
                <CircleUserRound size={55} />
                <div className="search-header">
                    <input type="text" placeholder="Busque..." className="search-input" />
                    <Search size={30} />
                </div>
                <button className="button" onClick={handleCriar}>CRIAR</button>
                <Bolt size={55} />
            </header>
        </>
    );
}