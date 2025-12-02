import DialogContent from "./Dialog";
import * as React from "react";
import { useState } from "react";

import { CircleUserRound } from "lucide-react";
import img1 from '../../../../../../assets/public/golang-sh-600x600.png'

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

    const handlePhoto = (photoOption: string) =>{
        setPhoto(photoOption);
    }

    const inputStyle = {
        fontWeight: '700',
        fontSize: '16px',
        color: 'white'
    };

    const divinputstyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    }


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
                        required
                    />
                    <label htmlFor="photo-input" style={inputStyle}>Avatar de perfil:</label>
                    <div style={divinputstyle}>
                        <button onClick={()=>handlePhoto('')} type="button">
                            <CircleUserRound size={50}/>
                        </button>
                        <button onClick={()=>handlePhoto('img1')} type="button">
                            <img src={img1} width={50} height={50}/>
                        </button>

                    </div>

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