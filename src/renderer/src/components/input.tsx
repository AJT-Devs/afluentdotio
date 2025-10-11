import { FunctionComponent } from "react";

interface InputProps {
  value?: string;
  placeholder?: string;
  theme?: "dark" | "light";
}
const Input: FunctionComponent<InputProps> = ({ placeholder }) => {
    return (
        <input
            placeholder={placeholder}
        />
    );
};

export default Input;