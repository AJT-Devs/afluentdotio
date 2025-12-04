import DialogContent from "./Dialog";
import * as React from "react";
import { useState } from "react";

import { CircleUserRound } from "lucide-react";
import cobol from '../../../../../../assets/public/cobol.png'
import cpp from '../../../../../../assets/public/cpp.png'
import delphi from '../../../../../../assets/public/delphi.png'
import golang from '../../../../../../assets/public/golang.png'
import java from '../../../../../../assets/public/java.png'
import kotlin from '../../../../../../assets/public/kotlin.png'
import python from '../../../../../../assets/public/python.png'
import rust from '../../../../../../assets/public/rust.png'

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

    const avatarOptions = [
        { name: 'cobol', path: cobol },
        { name: 'cpp', path: cpp },
        { name: 'delphi', path: delphi },
        { name: 'golang', path: golang },
        { name: 'java', path: java },
        { name: 'kotlin', path: kotlin },
        { name: 'python', path: python },
        { name: 'rust', path: rust }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        actionSubmit(name, (photo.trim() == "" ? null : photo));
        onOpenChange(false);
    };

    const handlePhoto = (photoPath: string) =>{
        setPhoto(photoPath);
    }

    const inputStyle = {
        fontWeight: '700',
        fontSize: '16px',
        color: 'white'
    };

    const divinputstyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap' as const
    }

    const buttonStyle = {
        padding: '5px',
        border: photo === '' ? '2px solid #007bff' : '2px solid transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }

    const getButtonStyle = (photoPath: string) => ({
        padding: '5px',
        border: photo === photoPath ? '2px solid #007bff' : '2px solid transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    });

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
                        <button 
                            onClick={()=>handlePhoto('')} 
                            type="button"
                            style={buttonStyle}
                        >
                            <CircleUserRound size={50}/>
                        </button>
                        {avatarOptions.map((avatar) => (
                            <button 
                                key={avatar.name}
                                onClick={()=>handlePhoto(avatar.path)} 
                                type="button"
                                style={getButtonStyle(avatar.path)}
                            >
                                <img src={avatar.path} width={50} height={50} alt={avatar.name}/>
                            </button>
                        ))}
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