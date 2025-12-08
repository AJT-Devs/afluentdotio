import Header from "@renderer/components/brainstorming/ConsoleHeaderBrainstorming"
import FooterToolsBar from "@renderer/components/brainstorming/ConsoleFooterToolsBarBrainstorming"
import { Panel } from '@xyflow/react';

import "@renderer/assets/stylesheets/components/brainstorming/console-brainstorming.css"

export interface ConsoleProps {
    onAddWord: (text: string) => void;
    isFreeMode : boolean;
    changeIsFreeMode;
    handleToBack : ()=>void;
    addWordsGeneratedAI : (words : string[])=>void;
    exportDoc : ()=>void;
    icon : string;
    title : string;
}

const Console = ({onAddWord, isFreeMode, changeIsFreeMode, handleToBack, addWordsGeneratedAI, exportDoc, icon, title}: ConsoleProps) => {
    return (
        <Panel>
            <div className="console-brainstorming">
                <Header handleToBack={handleToBack} exportDoc={exportDoc} icon={icon} title={title}/>
                <FooterToolsBar onAddWord={onAddWord} isFreeMode={isFreeMode} changeIsFreeMode={changeIsFreeMode} addWordsGeneratedAI={addWordsGeneratedAI}/>
            </div>
        </Panel>
    );
}

export default Console;