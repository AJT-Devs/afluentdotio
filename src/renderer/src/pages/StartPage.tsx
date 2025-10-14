import Afluent from "@renderer/components/AfluentLogo";
import { useNavigate } from "react-router-dom";
import TitleBar from '@renderer/layout/TitleBar';

const StartPage = () => {
  const navigate = useNavigate();

  return <div
    className="start-page">
    <TitleBar />
    <Afluent />
    <button
      onClick={() => { navigate("/introduction"); }} >
      INICIAR
    </button>

  </div>;
}

export default StartPage;