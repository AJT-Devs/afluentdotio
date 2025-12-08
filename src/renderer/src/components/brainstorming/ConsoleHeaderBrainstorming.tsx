import MainMenuBrainstorming from "./MainMenuBrainstorming";

import "@renderer/assets/stylesheets/components/brainstorming/console-header-toolsbar-brainstorming.css";

interface HeaderProps{
    handleToBack : ()=>void;
    exportDoc : ()=>void;
    icon : string;
    title : string;
}

const Header = ({handleToBack, exportDoc, icon, title}: HeaderProps) => {

    return(
        <div className='header-toolsbar'>
            <MainMenuBrainstorming toBack={handleToBack} exportDoc={exportDoc}/>
            <div className="title-brainstorming">{title}</div>
            <div className="icon-user"><img src={icon} alt="Icone do usuário" title="Icone do usuário" /></div>
        </div>
    );
}

export default Header;