import DialogContent from "./Dialog";
import * as React from "react";
import { useState } from "react";

interface DialogCreateUser {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actionSubmit: (name: string, photo?: string | null) => void;
}

const DialogCreateUser = ({ 
    open, 
    onOpenChange,
    actionSubmit 
}: DialogCreateUser) => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        actionSubmit(name, (photo.trim() == "" ? null : photo));
        onOpenChange(false);
    };

    const inputStyle = {
        fontWeight: '700',
        fontSize: '16px',
        color: 'white'
    };

    return (
        <DialogContent.Root open={open} onOpenChange={onOpenChange}>
            <DialogContent.Content>
                <DialogContent.Title>Cadastrar perfil</DialogContent.Title>
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username-input" style={inputStyle}>Nome * :</label>
                    <input type="text" 
                        name="username-input"
                        id="username-input"
                        placeholder="Username"
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        
                    />
                    <label htmlFor="photo-input" style={inputStyle}>Foto de perfil:</label>
                    <input type="text" 
                        name="photo-input"
                        id="photo-input"
                        placeholder="Cole a url da sua imagem"
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                    <div className="dialog-buttons">
                        <DialogContent.Close asChild>
                            <button type="button">Cancelar</button>
                        </DialogContent.Close>
                        
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </DialogContent.Content>
        </DialogContent.Root>
    );
};

export default DialogCreateUser;