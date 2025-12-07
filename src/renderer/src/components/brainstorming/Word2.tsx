// Word.tsx
import MenuContext from "@renderer/components/overlays/contextmenu/MenuContext";
import { useState, memo } from "react";
import DialogEditTextOfWord from "@renderer/components/overlays/dialogs/DialogEditTextOfWord";
import { NodeProps, Handle, Position } from '@xyflow/react';
import "@renderer/assets/stylesheets/components/brainstorming/word.css";

export interface WordNodeData extends Record<string, unknown> {
  wordText: string;
  onEditWord: (id: string | number, newText: string) => void;
  onDeleteWord: (id: string | number) => void;
}

const Word = memo((props: NodeProps<WordNodeData>) => {
  const { data, id } = props;

  const wordMaxText = 10;

  // Dados vindos do React Flow
  const wordTextInterface = data.wordText as string;
  const onEditWord = data.onEditWord as (id: string | number, newText: string) => void;
  const onDeleteWord = data.onDeleteWord as (id: string | number) => void;

  // Estados internos
  const [wordText, setWordText] = useState(wordTextInterface);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditSubmit = (newText: string) => {
    setWordText(newText);
    onEditWord(id, newText);
  };

  const handleDelete = () => {
    onDeleteWord(id);
  };

  return (
    <>
      <MenuContext.Root
        modal={false}
        onOpenChange={setIsMenuOpen}
      >
        <MenuContext.Trigger
          onFocus={(event) => {
            event.target.addEventListener('keydown', (e: KeyboardEvent) => {
              if (e.key === "Delete") handleDelete();
              else if (e.key === "F2") setIsDialogOpen(true);
            });
          }}
        >
          <span
            className={`word ${isMenuOpen ? "word-focus" : ""}`}
            tabIndex={0}
            aria-label={`Word element - ${wordText}`}
            title={wordText}
          >
            {wordText.length > wordMaxText
              ? wordText.slice(0, wordMaxText) + "..."
              : wordText}
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
            onSelect={handleDelete}
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
        wordText={wordText}
        actionSubmit={handleEditSubmit}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
      />
    </>
  );
});

export default Word;