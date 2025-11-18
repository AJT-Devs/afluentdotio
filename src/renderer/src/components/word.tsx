import { ContextMenuComponent } from "./overlays/ContextMenu";
import { useState } from "react";
import "@renderer/assets/stylesheets/components/word.css";

interface WordProps {
  wordText: string;
  onEditWord: () => void;
  onDeleteWord: () => void;
}

const Word = (props: WordProps) => {
  const [wordText, setWordText] = useState(props.wordText);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContextMenuComponent.Root 
      modal={false}
      onOpenChange={setIsMenuOpen}
    >
      <ContextMenuComponent.Trigger>
        <span 
          className={`word ${isMenuOpen ? "word-focus" : ""}`} 
          tabIndex={0}
          aria-label={`Word element - ${wordText}`}
          title={`${wordText}`}
        >
        {wordText}</span>
      </ContextMenuComponent.Trigger>
      <ContextMenuComponent.Portal>
        <ContextMenuComponent.Content>
          <ContextMenuComponent.Item onSelect={props.onEditWord} tabIndex={0} aria-label="Botão Editar">
            Editar
          </ContextMenuComponent.Item>
          <ContextMenuComponent.Item onSelect={props.onDeleteWord}  tabIndex={0} aria-label="Botão Deletar">
            Deletar
          </ContextMenuComponent.Item>
        </ContextMenuComponent.Content>
      </ContextMenuComponent.Portal>
    </ContextMenuComponent.Root>
  );
};

export default Word;