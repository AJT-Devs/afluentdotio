import Pool from "@renderer/components/brainstorming/Pool";
import Console from "@renderer/components/brainstorming/ConsoleBrainstorming"
import ThemeToggle from "@renderer/components/ThemeToggle";

import "@renderer/assets/stylesheets/pages/brainstorming-page.css"

const BrainstormingPage = () =>{
    return(



        <div className="brainstorming-page">
        
        {/* <ThemeToggle /> */}
        <Pool/>
        

        </div>

    );
}

export default BrainstormingPage;