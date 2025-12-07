import MainMenuBrainstorming from "./MainMenuBrainstorming";

import "@renderer/assets/stylesheets/components/brainstorming/console-header-toolsbar-brainstorming.css";

interface HeaderProps{
    handleToBack : ()=>void;
}

const Header = ({handleToBack}: HeaderProps) => {
    return(
        <div className='header-toolsbar'>
            <MainMenuBrainstorming toBack={handleToBack} />
        </div>
    );
}

export default Header;