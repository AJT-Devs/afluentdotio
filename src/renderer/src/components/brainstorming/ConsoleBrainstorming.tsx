import Header from "@renderer/components/brainstorming/ConsoleHeaderBrainstorming"
import FooterToolsBar from "@renderer/components/brainstorming/ConsoleFooterToolsBarBrainstorming"
import { Panel } from '@xyflow/react';

import "@renderer/assets/stylesheets/components/brainstorming/console-brainstorming.css"

export interface ConsoleProps {
    onAddWord: (text: string) => void;
    isFreeMode : boolean;
    changeIsFreeMode;
    handleToBack : ()=>void;
}

const Console = ({onAddWord, isFreeMode, changeIsFreeMode, handleToBack}: ConsoleProps) => {
    return (
        <Panel>
            <div className="console-brainstorming">
                <Header handleToBack={handleToBack} />
                <FooterToolsBar onAddWord={onAddWord} isFreeMode={isFreeMode} changeIsFreeMode={changeIsFreeMode}/>
            </div>
        </Panel>
    );
}

export default Console;