import { FormEvent, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useBranstormingStore } from "../store/BranstormingStore";
import {ChevronLeft} from "lucide-react";

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
  
  const [isBtnSubmitDisable, setIsBtnSubmitDisable] = useState<boolean>(true);

  const [titleIsHidden, setTitleIsHidden] = useState<boolean>(false);
  const [descriptionIsHidden, setDescriptionIsHidden] = useState<boolean>(true);
  const [btnToBackIsHidden, setBtnToBackIsHidden] = useState<boolean>(true);


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
  

  return(

    <div className="introduce-page">
      <button className="btn-icon" tabIndex={0} onClick={()=>{navigate("/dashboard")}}><ChevronLeft className="icon" size={50} /></button>
      <h1>Criando Brainstorming</h1>
      <form
        onSubmit={async (event:FormEvent<HTMLFormElement>)=>{
          event.preventDefault();

          if(title.trim() === "" || description.trim() === "" || btnToBackIsHidden){
            description.trim() === "" ? setIsBtnSubmitDisable(true) : setIsBtnSubmitDisable(false);
            if(title.trim() !== "") {
              setDescriptionIsHidden(false);
              setTitleIsHidden(true);
              setBtnToBackIsHidden(false);
            }

            return;
          }

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
        
        <input type="text" name="titleInput" placeholder="Título" className={`${titleIsHidden ? "isHidden" : ""}`} onChange={(e) => {
          setTitle(e.target.value)
          setIsBtnSubmitDisable(e.target.value.trim() === "" ? true : false)
          }}/>
        
        <textarea name="descriptionInput" placeholder="Descrição" className={`${descriptionIsHidden ? "isHidden" : ""}`} onChange={(e) => {
          setDescription(e.target.value)
          setIsBtnSubmitDisable(e.target.value.trim() === "" ? true : false)
          }}></textarea>
        
        <button type="submit" id="btn-submit-next" disabled={isBtnSubmitDisable}>
          Próximo
        </button>
        <button type="button" id="btn-back" name="btnBack" className={`${btnToBackIsHidden ? "isHidden" : ""}`} onClick={()=>{
            setDescriptionIsHidden(true);
            setTitleIsHidden(false);
            setBtnToBackIsHidden(true);
        }}>Voltar</button>
      </form>
      {errorMessage && <ErrorModal message={errorMessage} onClose={()=> setErrorMessage(null)} /> }
      {successMessage && <SuccessModal message={successMessage} onClose={()=> setSuccessMessage(null)} /> }
    </div>
  );
}

export default IntroducePage;