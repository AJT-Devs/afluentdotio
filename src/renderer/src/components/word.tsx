import { ContextMenuComponent, ContextMenuItemProps } from "./ContextMenu";
import { useState } from "react";
// import "@renderer/assets/stylesheets/components/word.css";

interface WordProps {
  wordText: string;
}

const Word = (props: WordProps) => {

  const [wordText, setWordText] = useState(props.wordText);

  return (
    <div className='word'>
      <ContextMenuComponent.Root>
        <ContextMenuComponent.Trigger>
          <span>{wordText}</span>
        </ContextMenuComponent.Trigger>
        <ContextMenuComponent.Portal>
          <ContextMenuComponent.Content>
            <ContextMenuComponent.Item onSelect={()=>{
              
            }}>
              Editar
            </ContextMenuComponent.Item>
            <ContextMenuComponent.Item onSelect={()=>{
              
            }}>
              Deletar
            </ContextMenuComponent.Item>
          </ContextMenuComponent.Content>
        </ContextMenuComponent.Portal>
      </ContextMenuComponent.Root>
    </div>
  );
}

export default Word;