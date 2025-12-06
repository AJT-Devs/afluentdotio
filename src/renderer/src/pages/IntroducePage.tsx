import Header from "@renderer/layout/Header";
import { FormEvent, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useBranstormingStore } from "../store/BranstormingStore";

import "@renderer/assets/stylesheets/pages/introduce-page.css";
import { Brainstorm } from "../../../entities/Brainstorm";
import { SuccessResponse } from "../../../entities/SuccessResponse";
import { ErrorModal } from "@renderer/components/modals/ErrorModal";
import { SuccessModal } from "@renderer/components/modals/SuccessModal";

const IntroducePage = () => {
  const navigate = useNavigate();

  const [title , setTitle] = useState(""); 
  const [description , setDescription] = useState("");
  const [userId , setUserId] = useState<string | null>(null);
  const hasFetched = useRef<Boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect (() => {
    if (hasFetched.current) {
        return;
    }
    hasFetched.current = true; 

    const getLocalStorageData = async () => {
      setUserId ( sessionStorage.getItem('userId'));
    }
    getLocalStorageData();
  }, []);
  

  return <div
    className="introduce-page" 
    >
    <Header />
    <form
      onSubmit={async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const brainstorm = new Brainstorm(null, title, description, null, userId ?? "");
        const response: SuccessResponse<Brainstorm> | Error = await window.brainstorm.postBrainstorm(brainstorm);
        if (response instanceof Error) {
          setErrorMessage(response.message);
          return;
        }
        setSuccessMessage("Brainstorm criado com sucesso!");
        const timer = setTimeout(() => {
          setSuccessMessage(null);
        }, 2000)
        clearTimeout(timer);

        sessionStorage.setItem("brainstormId", response.data.id ?? "");
        sessionStorage.setItem("brainstormName", response.data.name);
        sessionStorage.setItem("brainstormContext", response.data.context);
        
        navigate("/brainstorming");

      }}
    >
      
      <label id="title-input">
        Titulo
        <input type="text" name="title-input" onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label id="description-input">
        Descrição
        <textarea name="description-input" onChange={(e) => setDescription(e.target.value)} required></textarea>
      </label>
      <button type="submit" >
        INICIAR
      </button>
    </form>
    {errorMessage && <ErrorModal message={errorMessage} onClose={()=> setErrorMessage(null)} /> }
    {successMessage && <SuccessModal message={successMessage} onClose={()=> setSuccessMessage(null)} /> }
  </div>;
}

export default IntroducePage;