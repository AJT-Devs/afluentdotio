import { useState, FormEvent, use } from 'react';
import "@renderer/assets/stylesheets/components/brainstorming/console-footer-toolsbar-brainstorming.css"

export interface WordCreatorToolProps{
    onAddWord: (text: string) => void;
}

const WordCreatorTool = ({onAddWord, ...props}: WordCreatorToolProps) => {
    const [inputValue, setInputValue] = useState('');
    
    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      onAddWord(inputValue);
      setInputValue(''); // Limpa input
    }
  };

    return(
         <form className="word-creator" onSubmit={handleSubmit}>
            <input
                type="text"
                className="word-creator-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Adicionar ideia..."
                autoComplete="off"
            />
            <button type="submit" className="word-creator-btn">
                Adicionar
            </button>
        </form>
    );
}

export default WordCreatorTool;