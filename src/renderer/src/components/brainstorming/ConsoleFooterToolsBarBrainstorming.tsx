import WordCreatorTool from './WordCreatorTool';
import LockFreeModeToggle from './LockFreeModeToggle';

import DialogSuggestionsIA from '../overlays/dialogs/DialogSuggestionsIA';

import "@renderer/assets/stylesheets/components/brainstorming/console-footer-toolsbar-brainstorming.css"
export interface FooterToolsBarProps{
    onAddWord: (text: string) => void;
    isFreeMode : boolean;
    changeIsFreeMode : ()=>void;
    addWordsGeneratedAI : (words : string[])=>void;
}

const FooterToolsBar = ({onAddWord, changeIsFreeMode, isFreeMode, addWordsGeneratedAI}: FooterToolsBarProps) => {

    return(
        <div className='footer-toolsbar'>
            <LockFreeModeToggle isFreeMode={isFreeMode} changeIsFreeMode={changeIsFreeMode}/>
            <WordCreatorTool onAddWord={onAddWord}/>
            <DialogSuggestionsIA addWordsGeneratedAI={addWordsGeneratedAI}/>
        </div>
    );
}

export default FooterToolsBar;