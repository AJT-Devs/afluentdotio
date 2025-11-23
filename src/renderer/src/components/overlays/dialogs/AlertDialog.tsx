import React, {ComponentProps, ReactNode} from "react";
import { 
    Root,
    Trigger,
    Portal,
    Overlay,
    Content as ContentD,
    Action,
    Cancel,
    Title as TitleD,
    Description as DescriptionD,
} from "@radix-ui/react-alert-dialog";
import "@renderer/assets/stylesheets/components/alert-dialog.css"

interface ContentProps {
    children: ReactNode;
    className?: string;
}

export const Content = ({ children, className, ...props }: ContentProps) => {
    return (
        <Portal>
            <Overlay className="alert-dialog-overlay" />
            <ContentD 
                {...props}
                className={`alert-dialog ${className || ''}`}
            >
                {children}
            </ContentD>
        </Portal>
    )
}

export const Title = (props: ComponentProps<typeof TitleD>) => {
    return (
        <TitleD
            {...props}
            className={`dialog-title ${props.className || ''}`}
        />
    )
}

export const Description = (props: ComponentProps<typeof DescriptionD>) => {
    return (
        <DescriptionD
            {...props}
            className={`dialog-description ${props.className || ''}`}
        />
    )
}

const AlertDialogContent = {
    Root,
    Trigger,
    Content,
    Title,
    Description,
    Cancel,
    Action,
}

export default AlertDialogContent;