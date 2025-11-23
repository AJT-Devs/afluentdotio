import MenuContext from "@renderer/components/overlays/contextmenu/MenuContext";
import { useState, memo } from "react";
import DialogEditTextOfWord from "@renderer/components/overlays/dialogs/DialogEditTextOfWord";
import {NodeProps, Node, Handle, Position} from '@xyflow/react';
import "@renderer/assets/stylesheets/components/brainstorming/word.css";

export interface WordNodeData extends Record<string, unknown> {
  wordText: string;
  onEditWord: (id: string, newText: string) => void;
  onDeleteWord: (id: string) => void; 
}

const Word = memo((props: NodeProps<Node<WordNodeData, string | undefined>>) => {

  const { data, id } = props;

  // Tipagem dos props vindos do React Flow
  const wordTextInterface = data.wordText as string;
  const onEditWord = data.onEditWord as (id: string, newText: string) => void;
  const onDeleteWord= data.onDeleteWord as (id: string) => void;

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
  }

  
  return (
    <>
      <MenuContext.Root 
            modal={false}
            onOpenChange={setIsMenuOpen}
        >
            <MenuContext.Trigger>
                <span 
                    className={`word ${isMenuOpen ? "word-focus" : ""}` } 
                    tabIndex={0}
                    aria-label={`Word element - ${wordText}`}
                    title={`${wordText}`}
                >
                    {wordText}
                </span>
            </MenuContext.Trigger>
              <MenuContext.Content>
                  <MenuContext.Item 
                      onSelect={() => {
                          setIsDialogOpen(true); // Abre o dialog
                      }} 
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

        {/* Dialog fora do ContextMenu */}
        <DialogEditTextOfWord
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            wordText={wordText}
            actionSubmit={handleEditSubmit}
        />

      {/* Handle (invisível, mas necessário pro React Flow) */}
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ opacity: 0 }}
        />
    </>
  )
});

export default Word;