import Pool from "@renderer/components/brainstorming/Pool";
import ThemeToggle from "@renderer/components/ThemeToggle";
import { useEffect } from "react";
import Brainstorm from "@renderer/components/brainstorming/Brainstorming";


import "@renderer/assets/stylesheets/pages/brainstorming-page.css"


const BrainstormingPage = () =>{
    useEffect(()=>{
        
    })

    return(



        <div className="brainstorming-page">
        
        {/* <ThemeToggle /> */}
        {/* <Pool/> */}
        <Brainstorm/>
        

        </div>

    );
}

export default BrainstormingPage;