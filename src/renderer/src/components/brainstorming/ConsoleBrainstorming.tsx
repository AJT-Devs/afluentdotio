import Header from "@renderer/components/brainstorming/ConsoleHeaderBrainstorming"
import FooterToolsBar from "@renderer/components/brainstorming/ConsoleFooterToolsBarBrainstorming"
import { Panel } from '@xyflow/react';

import "@renderer/assets/stylesheets/components/brainstorming/console-brainstorming.css"

export interface ConsoleProps {
    onAddWord: (text: string) => void;
    isFreeMode: boolean;
    handleToggleFreeMode: ()=>void;
    handleToBack : ()=>void;
}

const Console = ({onAddWord, isFreeMode, handleToggleFreeMode, handleToBack, ...props}: ConsoleProps) => {
    return (
        <Panel>
            <div className="console-brainstorming">
                <Header isFreeMode={isFreeMode} handleToggleFreeMode={handleToggleFreeMode} handleToBack={handleToBack}/>
                <FooterToolsBar onAddWord={onAddWord}/>
            </div>
        </Panel>
    );
}

export default Console;