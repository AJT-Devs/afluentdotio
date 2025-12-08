import MenuContext from "./MenuContext";
import { useState, ReactNode } from "react";

export interface MenuContextDashboardItemProps {
    children : ReactNode;
    handleOpenBrainstorm: (id : string | number)=>void;
    handleDuplicatorBrainstorm : (id : string | number)=>void;
    handleEditNameBrainstorm : (id : string | number, newName : string)=>void;
    handleConfirmDeleteBrainstorm : ()=>void;
    handleDeleteBrainstorm : (id : string | number)=>void;
}

const MenuContextDashboardItem = ({children, handleOpenBrainstorm, handleDuplicatorBrainstorm, handleEditNameBrainstorm, handleConfirmDeleteBrainstorm, ...props} : MenuContextDashboardItemProps) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <MenuContext.Root 
                modal={false}
            >
                <MenuContext.Trigger>
                    {children}
                </MenuContext.Trigger>
                  <MenuContext.Content>
                      <MenuContext.Item 
                          tabIndex={0} 
                          aria-label="Botão Abrir"
                          onSelect={()=>{handleOpenBrainstorm}}
                      >
                          Abrir
                      </MenuContext.Item>
                      <MenuContext.Item 
                          tabIndex={0} 
                          aria-label="Botão Duplicar"
                          onSelect={()=>{handleDuplicatorBrainstorm}}
                      >
                          Duplicar
                      </MenuContext.Item>
                      <MenuContext.Item 
                          tabIndex={0} 
                          aria-label="Botão Renomear"
                          onSelect={()=>{handleEditNameBrainstorm}}
                      >
                          Renomear
                      </MenuContext.Item>
                      <MenuContext.Item 
                          tabIndex={0} 
                          className="menu-context-item-delete"
                          aria-label="Botão Mover para lixeira"
                          onSelect={()=>{handleConfirmDeleteBrainstorm}}
                      >
                          Mover Para Lixeira
                      </MenuContext.Item>
                  </MenuContext.Content>
            </MenuContext.Root>
        </>
    );
}

export default MenuContextDashboardItem;