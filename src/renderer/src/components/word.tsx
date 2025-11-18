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

  return (
    <ContextMenuComponent.Root modal={false}>
      <ContextMenuComponent.Trigger asChild>
        <span className="word">{wordText}</span>
      </ContextMenuComponent.Trigger>
      <ContextMenuComponent.Portal>
        <ContextMenuComponent.Content 
          // onOpenAutoFocus={(e) => e.preventDefault()}
          // onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <ContextMenuComponent.Item onSelect={props.onEditWord} tabIndex={0}>
            Editar
          </ContextMenuComponent.Item>
          <ContextMenuComponent.Item onSelect={props.onDeleteWord}  tabIndex={0}>
            Deletar
          </ContextMenuComponent.Item>
        </ContextMenuComponent.Content>
      </ContextMenuComponent.Portal>
    </ContextMenuComponent.Root>
  );
};

export default Word;