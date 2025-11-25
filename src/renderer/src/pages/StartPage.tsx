import Afluent from "@renderer/components/AfluentLogo";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "@renderer/components/ThemeToggle";

import "@renderer/assets/stylesheets/pages/start-page.css";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="start-page">
        
      
      
      <Afluent />
      <button
        onClick={() => { navigate("/login"); }} >
        INICIAR
      </button>

      <ThemeToggle />
      
    </div>
  )
}

export default StartPage;