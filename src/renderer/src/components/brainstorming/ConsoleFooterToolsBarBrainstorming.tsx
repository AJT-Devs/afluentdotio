import { useState, FormEvent, use } from 'react';
import WordCreatorTool from './WordCreatorTool';
import AiIcon from '@renderer/components/AiIcon';

import "@renderer/assets/stylesheets/components/brainstorming/console-footer-toolsbar-brainstorming.css"
export interface FooterToolsBarProps{
    onAddWord: (text: string) => void;
}

const FooterToolsBar = ({onAddWord, ...props}: FooterToolsBarProps) => {
    

    return(
        <div className='footer-toolsbar'>
            <WordCreatorTool onAddWord={onAddWord}/>
            <button className='ai-button'>
                <AiIcon/>
            </button>
        </div>
    );
}

export default FooterToolsBar;