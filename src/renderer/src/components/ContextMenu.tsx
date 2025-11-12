// import * as React from "react";
import { ContextMenu } from "radix-ui";
import { ComponentProps } from "react";

type RadixItemProps = ComponentProps<typeof ContextMenu.Item>

export interface ContextMenuItemProps extends RadixItemProps {
    onSelect: () => void;
}



const Root = ContextMenu.Root;
const Trigger = ContextMenu.Trigger;
const Portal = ContextMenu.Portal;
const Separator = ContextMenu.Separator;
const Content = (props: ComponentProps<typeof ContextMenu.Content>) => {
  return (
    <ContextMenu.Content 
      {...props} 
      className="context-menu"
    />
  );
};
const Item = (props: ContextMenuItemProps) => {
  return (
    <ContextMenu.Item 
      {...props} 
      className="context-menu"
    />
  );
};

export const ContextMenuComponent = {
    Root,
    Trigger,
    Portal,
    Content,
    Item,
    Separator,
}