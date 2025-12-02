import MenuContext from "./MenuContext";
import { useState, ReactNode } from "react";

export interface MenuContextDashboardItemProps {
    children : ReactNode;
    onEditNameBrainstorm : (newName : string)=>void;
}

const MenuContextDashboardItem = (props : MenuContextDashboardItemProps) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <MenuContext.Root 
                modal={false}
            >
                <MenuContext.Trigger>
                    {props.children}
                </MenuContext.Trigger>
                  <MenuContext.Content>
                      <MenuContext.Item 
                          tabIndex={0} 
                          aria-label="Botão Abrir"
                          onSelect={()=>{}}
                      >
                          Abrir
                      </MenuContext.Item>
                      <MenuContext.Item 
                          tabIndex={0} 
                          aria-label="Botão Duplicar"
                          onSelect={()=>{setIsDialogOpen(true)}}
                      >
                          Duplicar
                      </MenuContext.Item>
                      <MenuContext.Item 
                          tabIndex={0} 
                          aria-label="Botão Renomear"
                          onSelect={()=>{}}
                      >
                          Renomear
                      </MenuContext.Item>
                      <MenuContext.Item 
                          tabIndex={0} 
                          className="menu-context-item-delete"
                          aria-label="Botão Mover para lixeira"
                          onSelect={()=>{}}
                      >
                          Mover Para Lixeira
                      </MenuContext.Item>
                  </MenuContext.Content>
            </MenuContext.Root>
        </>
    );
}

export default MenuContextDashboardItem;