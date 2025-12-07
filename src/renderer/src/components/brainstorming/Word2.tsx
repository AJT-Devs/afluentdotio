// Word.tsx
import MenuContext from "@renderer/components/overlays/contextmenu/MenuContext";
import { useState, memo } from "react";
import DialogEditTextOfWord from "@renderer/components/overlays/dialogs/DialogEditTextOfWord";
import {BrainstormNode} from "src/entities/Brainstorm";
import "@renderer/assets/stylesheets/components/brainstorming/word.css";

export interface WordProps extends BrainstormNode{
  handleEditWord: (id: string | number, newText: string) => void;
  handleDeleteWord: (id: string | number) => void;
}

const Word = memo(({word, handleEditWord, handleDeleteWord} : WordProps) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const wordOnKeyListener = (event) => {
      event.target.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === "Delete") handleDeleteWord;
          else if (e.key === "F2") setIsDialogOpen(true);
      });
  }
  
  const wordMaxText = 10;

  return (
    <>
      <MenuContext.Root
        modal={false}
        onOpenChange={setIsMenuOpen}
      >
        <MenuContext.Trigger onFocus={(event) => {wordOnKeyListener(event)}}>
          <span
            className={`word ${isMenuOpen ? "word-focus" : ""}`}
            tabIndex={0}
            aria-label={`Word element - ${word}`}
            title={word}
          >
            {word.length > wordMaxText
              ? word.slice(0, wordMaxText) + "..."
              : word}
          </span>
        </MenuContext.Trigger>

        <MenuContext.Content>
          <MenuContext.Item
            onSelect={() => setIsDialogOpen(true)}
            tabIndex={0}
            aria-label="Botão Editar"
          >
            Editar
          </MenuContext.Item>

          <MenuContext.Item
            onSelect={()=>{handleDeleteWord}}
            tabIndex={0}
            aria-label="Botão Deletar"
          >
            Deletar
          </MenuContext.Item>
        </MenuContext.Content>
      </MenuContext.Root>

      <DialogEditTextOfWord
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        wordText={word}
        actionSubmit={()=>{handleEditWord}}
      />
    </>
  );
});

export default Word;