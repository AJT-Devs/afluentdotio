import AfluentLogo from "../AfluentLogo";
import {ChevronDown} from "lucide-react";
import DropMenu from "../overlays/dropmenu/DropMenu";
import {useState} from "react";
import { useTheme } from "@renderer/contexts/ThemeContext";

import "@renderer/assets/stylesheets/components/brainstorming/main-menu-brainstorming.css"

interface MainMenuBrainstormingProps {
    toBack : ()=>void;
    exportDoc : ()=>void;
    toArchiveDoc : ()=>void;
    toDeleteDoc : ()=>void;
    toOpenConfig : ()=>void;
}

const MainMenuBrainstorming = ({toBack, exportDoc, toArchiveDoc, toDeleteDoc, toOpenConfig} : MainMenuBrainstormingProps) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <DropMenu.Root
                modal={false}
                onOpenChange={setIsMenuOpen}
            >
                <DropMenu.Trigger className={`main-menu-brainstorm ${isMenuOpen ? "main-menu-focus" : ""}`}>
                        <AfluentLogo/>
                        <ChevronDown/>
                </DropMenu.Trigger>
                <DropMenu.Content>
                    <DropMenu.Item onSelect={toBack}>
                        Voltar
                    </DropMenu.Item>
                    <DropMenu.Item onSelect={exportDoc}>
                        Exportar
                    </DropMenu.Item>
                    <DropMenu.Item onSelect={toArchiveDoc}>
                        Arquivar
                    </DropMenu.Item>
                    <DropMenu.Item onSelect={toggleTheme}>
                        {theme === 'light' ? "Tema Escuro" : "Tema Claro"}
                    </DropMenu.Item>
                    <DropMenu.Item onSelect={toOpenConfig}>
                        Configurações
                    </DropMenu.Item>
                    <DropMenu.Item onSelect={toDeleteDoc} className="drop-menu-item-delete">
                        Mover para a lixeira
                    </DropMenu.Item>
                </DropMenu.Content>
            </DropMenu.Root>
        </>

    )
}

export default MainMenuBrainstorming;