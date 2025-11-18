import * as ContextMenu from "@radix-ui/react-context-menu";
import { ComponentProps } from "react";
import "@renderer/assets/stylesheets/components/context-menu.css";

type RadixItemProps = ComponentProps<typeof ContextMenu.Item>;

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
      className="menu-context"
    />
  );
};

const Item = (props: ContextMenuItemProps) => {
  return (
    <ContextMenu.Item {...props} className="menu-context-item" />
  );
};

export const ContextMenuComponent = {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  Separator,
};