import { FC } from "react";
import { button } from "./Button.css";

interface ButtonProps {
  children: React.ReactElement;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button className={button} onClick={onClick}>
    {children}
  </button>
);
