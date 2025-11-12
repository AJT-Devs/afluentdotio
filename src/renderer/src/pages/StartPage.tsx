import Afluent from "@renderer/components/AfluentLogo";
import { useNavigate } from "react-router-dom";
import TitleBar from '@renderer/layout/TitleBar';
import Word from "@renderer/components/Word";

import "@renderer/assets/stylesheets/pages/start-page.css";

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

    <Word wordText="Teste"/>

  </div>;
}

export default StartPage;