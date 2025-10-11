import { FunctionComponent, ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  theme?: "dark" | "light";
}

const Button: FunctionComponent<ButtonProps> = () => {
  return <button></button>;  
};

export default Button;