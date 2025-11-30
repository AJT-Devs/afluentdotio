import {Root, Trigger, Portal, Content as ContentD, Item as ItemD} from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import "@renderer/assets/stylesheets/components/drop-menu.css"

interface ContentProps{
    children: React.ReactNode;
    className?: string;
}

export const Content = ({ children, className, ...props }: ContentProps) => {
    return (
        <Portal>
            <ContentD 
                {...props}
                className={`drop-menu ${className || ''}`}
            >
                {children}
            </ContentD>
        </Portal>
    )
}

type RadixItemProps = React.ComponentProps<typeof ItemD>;

interface ItemProps extends RadixItemProps{
    children: React.ReactNode;
    className?: string;
    onSelect : ()=>void;
}

export const Item = ({children, className, ...props}: ItemProps) => {
    return(
        <ItemD
            {...props}
            className={`drop-menu-item ${className || ''}`}
        >

            {children}

        </ItemD>
    )
}

const DropMenu = {
    Root,
    Trigger,
    Content,
    Item
}

export default DropMenu;