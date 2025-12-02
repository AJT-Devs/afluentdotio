import DialogContent from "./Dialog";
import * as React from "react";
import { useState } from "react";

interface DialogEditTextOfWordProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    wordText: string;
    actionSubmit: (newText: string) => void;
}

const DialogEditTextOfWord = ({ 
    open, 
    onOpenChange, 
    wordText, 
    actionSubmit 
}: DialogEditTextOfWordProps) => {
    const [inputValue, setInputValue] = useState(wordText);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        actionSubmit(inputValue);
        onOpenChange(false);
    };

    return (
        <DialogContent.Root open={open} onOpenChange={onOpenChange}>
            <DialogContent.Content>
                <DialogContent.Title>Editar texto</DialogContent.Title>
                <DialogContent.Description>
                    Edite o texto da palavra abaixo
                </DialogContent.Description>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="edit-word" 
                        name="inputEditWord" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                    />
                    
                    <div className="dialog-buttons">
                        <DialogContent.Close asChild>
                            <button type="button">Cancelar</button>
                        </DialogContent.Close>
                        
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </DialogContent.Content>
        </DialogContent.Root>
    );
};

export default DialogEditTextOfWord;