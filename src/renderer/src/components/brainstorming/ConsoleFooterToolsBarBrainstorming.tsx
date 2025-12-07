import { useState, FormEvent, use } from 'react';
import WordCreatorTool from './WordCreatorTool';

import DialogSuggestionsIA from '../overlays/dialogs/DialogSuggestionsIA';

import "@renderer/assets/stylesheets/components/brainstorming/console-footer-toolsbar-brainstorming.css"
export interface FooterToolsBarProps{
    onAddWord: (text: string) => void;
}

const FooterToolsBar = ({onAddWord, ...props}: FooterToolsBarProps) => {

    return(
        <div className='footer-toolsbar'>
            <WordCreatorTool onAddWord={onAddWord}/>
            <DialogSuggestionsIA/>
        </div>
    );
}

export default FooterToolsBar;