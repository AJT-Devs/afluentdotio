import WordCreatorTool from './WordCreatorTool';
import LockFreeModeToggle from './LockFreeModeToggle';

import DialogSuggestionsIA from '../overlays/dialogs/DialogSuggestionsIA';

import "@renderer/assets/stylesheets/components/brainstorming/console-footer-toolsbar-brainstorming.css"
export interface FooterToolsBarProps{
    onAddWord: (text: string) => void;
    isFreeMode : boolean;
    changeIsFreeMode : ()=>void;
}

const FooterToolsBar = ({onAddWord, changeIsFreeMode, isFreeMode}: FooterToolsBarProps) => {

    return(
        <div className='footer-toolsbar'>
            <LockFreeModeToggle isFreeMode={isFreeMode} changeIsFreeMode={changeIsFreeMode}/>
            <WordCreatorTool onAddWord={onAddWord}/>
            <DialogSuggestionsIA/>
        </div>
    );
}

export default FooterToolsBar;