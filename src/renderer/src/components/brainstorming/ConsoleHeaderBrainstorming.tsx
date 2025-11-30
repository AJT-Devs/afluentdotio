import MainMenuBrainstorming from "./MainMenuBrainstorming";

import "@renderer/assets/stylesheets/components/brainstorming/console-header-toolsbar-brainstorming.css";

interface HeaderProps{
    isFreeMode : boolean;
    handleToggleFreeMode : ()=>void;
}

const Header = ({isFreeMode, handleToggleFreeMode}: HeaderProps) => {
    return(
        <div className='header-toolsbar'>
            <MainMenuBrainstorming isFreeMode={isFreeMode} handleToggleFreeMode={handleToggleFreeMode}/>
        </div>
    );
}

export default Header;