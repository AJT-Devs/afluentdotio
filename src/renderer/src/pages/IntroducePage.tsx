import Header from "@renderer/layout/Header";
import * as motion from "motion/react-client"
import { FormEvent } from "react";
import {useNavigate} from "react-router-dom"

const IntroducePage = () => {
  const navigate = useNavigate();

  return <div
    className="introduce-page" 
    >

    <Header />
    <form
      onSubmit={(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        navigate("/preview");

      }}
    >
      
      <motion.label id="title-input"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          scale: { type: "spring", stiffness: 120, damping: 12 }
        }}
      >
        Titulo
        <input type="text" name="title-input" required />
      </motion.label>
      <motion.label id="description-input"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          scale: { type: "spring", stiffness: 120, damping: 12 }
        }}
      >
        Descrição
        <textarea name="description-input" required></textarea>
      </motion.label>
      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          scale: { type: "spring", stiffness: 120, damping: 12 }
        }}
        type="submit" >
        INICIAR
      </motion.button>
    </form>

  </div>;
}

export default IntroducePage;