import DialogContent from "./Dialog";
import * as React from "react";
import { useState } from "react";

interface DialogEditOneTextProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    text: string;
    actionSubmit: (newText: string) => void;
    title : string;
    inputValue, setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const DialogEditOneText = ({ open, onOpenChange, text, actionSubmit, title, inputValue, setInputValue}: DialogEditOneTextProps) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        actionSubmit(inputValue);
        onOpenChange(false);
    };

    return (
        <DialogContent.Root open={open} onOpenChange={onOpenChange}>
            <DialogContent.Content>
                <DialogContent.Title>{title || "Editar texto"}</DialogContent.Title>
                {/* <DialogContent.Description>
                    {description || "Edite o texto abaixo e clique em salvar."}
                </DialogContent.Description> */}
                
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
                        <DialogContent.Close asChild >
                            <button type="button">Cancelar</button>
                        </DialogContent.Close>
                        
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </DialogContent.Content>
        </DialogContent.Root>
    );
};

export default DialogEditOneText;