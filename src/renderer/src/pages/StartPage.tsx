import Afluent from "@renderer/components/AfluentLogo";
import { useNavigate } from "react-router-dom";


const StartPage = () => {
  const navigate = useNavigate();

  return <div
    className="start-page">
    <Afluent />
    <button
      onClick={() => { navigate("/introduction"); }} >
      INICIAR
    </button>

  </div>;
}

export default StartPage;