import * as ContextMenu from "@radix-ui/react-context-menu";
import { ComponentProps, ReactNode } from "react";
import "@renderer/assets/stylesheets/components/context-menu.css";

type RadixItemProps = ComponentProps<typeof ContextMenu.Item>;

interface ContextMenuItemProps extends RadixItemProps {
  onSelect: () => void;
}

export const Root = ContextMenu.Root;
export const Trigger = ContextMenu.Trigger;

interface ContentProps {
    children: ReactNode;
    className?: string;
}

export const Content = ({ children, className, ...props }: ContentProps) => {
    return (
        <ContextMenu.Portal>
            <ContextMenu.Content 
                {...props}
                className={`menu-context ${className || ''}`}
            >
                {children}
            </ContextMenu.Content>
        </ContextMenu.Portal>
    )
}

export const Item = (props: ContextMenuItemProps) => {
  return (
    <ContextMenu.Item {...props} className="menu-context-item" />
  );
};

const MenuContext = {
  Root,
  Trigger,
  Content,
  Item
};

export default MenuContext;