import * as Dialog from "@radix-ui/react-dialog";
import { ComponentProps } from "react";
import "@renderer/assets/stylesheets/components/dialog.css"

const Root = Dialog.Root;
const Trigger = Dialog.Trigger;
const Portal = Dialog.Portal;
const Overlay = Dialog.Overlay;

const Content = (props: ComponentProps<typeof Dialog.Content>) => {
    return (
        <Dialog.Content
        {...props}
        className="dialog"
        />
    )
}
const Title = (props: ComponentProps<typeof Dialog.Title>) => {
    return (
        <Dialog.Title
        {...props}
        className="dialog-title"
        />
    )
}
const Description = (props: ComponentProps<typeof Dialog.Description>) => {
    return (
        <Dialog.Description
        {...props}
        className="dialog-description"
        />
    )
}

interface CloseProps extends ComponentProps<typeof Dialog.Close> {
    onClick: () => void;
}

const Close = (props: CloseProps) => {
    return (
        <Dialog.Close
        {...props}
        className="dialog-close"
        />
    )
}

const DialogContent = {
    Root, 
    Trigger, 
    Portal, 
    Overlay, 
    Content, 
    Title, 
    Description, 
    Close
}

export default DialogContent;