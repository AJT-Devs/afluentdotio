import MenuContext from "@renderer/components/overlays/contextmenu/MenuContext";
import { useState, memo } from "react";
import DialogEditTextOfWord from "@renderer/components/overlays/dialogs/DialogEditTextOfWord";
import { NodeProps, Handle, Position } from "@xyflow/react";
import "@renderer/assets/stylesheets/components/brainstorming/word.css";

export type WordNodeRFData = {
  word: string;
  onEditWord: (id: string, newText: string) => void;
  onDeleteWord: (id: string) => void;
};

const Word = memo((props: NodeProps<WordNodeRFData>) => {
  const { id, data, selected } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const wordMaxText = 15;
  const text = data.word ?? "";

  const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Delete") data.onDeleteWord(id);
    else if (e.key === "F2") setIsDialogOpen(true);
  };

    return (
      <>
        <MenuContext.Root modal={false} onOpenChange={setIsMenuOpen}>
          <MenuContext.Trigger>
            <span
            className={`word ${isMenuOpen ? "word-focus" : ""} ${selected ? "word-selected" : ""}`}
            tabIndex={0}
            aria-label={`Word element - ${text}`}
            title={text}
            onKeyDown={onKeyDown}
            >
            {text.length > wordMaxText ? text.slice(0, wordMaxText) + "..." : text}
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
                    onSelect={() => data.onDeleteWord(id)}
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
            wordText={text}
            actionSubmit={(newText) => data.onEditWord(id, newText)}
          />
    </>
    );
});

Word.displayName = "Word";
export default Word;