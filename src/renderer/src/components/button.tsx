import { FunctionComponent, ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  // theme?: "dark" | "light";
  children: ReactNode;
}

const Button: FunctionComponent<ButtonProps> = () => {
  return <button></button>;  
};

export default Button;