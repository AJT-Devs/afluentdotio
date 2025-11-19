import * as Dialog from "@radix-ui/react-dialog";
import React, { ComponentProps, ReactNode } from "react";
import "@renderer/assets/stylesheets/components/dialog.css"

export const Root = Dialog.Root;
export const Trigger = Dialog.Trigger;

interface ContentProps {
    children: ReactNode;
    className?: string;
}

export const Content = ({ children, className, ...props }: ContentProps) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content 
                {...props}
                className={`dialog ${className || ''}`}
            >
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export const Title = (props: ComponentProps<typeof Dialog.Title>) => {
    return (
        <Dialog.Title
            {...props}
            className={`dialog-title ${props.className || ''}`}
        />
    )
}

export const Description = (props: ComponentProps<typeof Dialog.Description>) => {
    return (
        <Dialog.Description
            {...props}
            className={`dialog-description ${props.className || ''}`}
        />
    )
}

export const Close = Dialog.Close;

const DialogContent = {
    Root,
    Trigger,
    Content,
    Title,
    Description,
    Close,
};

export default DialogContent;