import MenuContext from "./MenuContext";
import { useState } from "react";
import DialogEditTextOfWord from "../dialogs/DialogEditTextOfWord";

export interface MenuContextWordProps {
    wordText: string;
    handleEditWord: (newText: string) => void;
    handleDeleteWord: () => void;
}

const MenuContextWord = (props : MenuContextWordProps) => {
    const [wordText, setWordText] = useState(props.wordText);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditSubmit = (newText: string) => {
        setWordText(newText);
        props.handleEditWord(newText);
    };

    return (
        <>
            <MenuContext.Root 
                modal={false}
                onOpenChange={setIsMenuOpen}
            >
                <MenuContext.Trigger>
                    <span 
                        className={`word ${isMenuOpen ? "word-focus" : ""}`} 
                        tabIndex={0}
                        aria-label={`Word element - ${wordText}`}
                        title={`${wordText}`}
                    >
                        {wordText}
                    </span>
                </MenuContext.Trigger>
                  <MenuContext.Content>
                      <MenuContext.Item 
                          onSelect={() => {
                              setIsDialogOpen(true); // Abre o dialog
                          }} 
                          tabIndex={0} 
                          aria-label="Botão Editar"
                      >
                          Editar
                      </MenuContext.Item>
                      
                      <MenuContext.Item 
                          onSelect={()=>{props.handleDeleteWord}}  
                          tabIndex={0} 
                          aria-label="Botão Deletar"
                      >
                          Deletar
                      </MenuContext.Item>
                  </MenuContext.Content>
            </MenuContext.Root>

            {/* Dialog fora do ContextMenu */}
            <DialogEditTextOfWord
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                wordText={wordText}
                actionSubmit={handleEditSubmit}
            />
        </>
    );
}

export default MenuContextWord;