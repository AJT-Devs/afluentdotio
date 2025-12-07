import MainMenuBrainstorming from "./MainMenuBrainstorming";

import "@renderer/assets/stylesheets/components/brainstorming/console-header-toolsbar-brainstorming.css";

interface HeaderProps{
    isFreeMode : boolean;
    handleToggleFreeMode : ()=>void;
    handleToBack : ()=>void;
}

const Header = ({isFreeMode, handleToggleFreeMode, handleToBack}: HeaderProps) => {
    return(
        <div className='header-toolsbar'>
            <MainMenuBrainstorming isFreeMode={isFreeMode} handleToggleFreeMode={handleToggleFreeMode} toBack={handleToBack}/>
        </div>
    );
}

export default Header;