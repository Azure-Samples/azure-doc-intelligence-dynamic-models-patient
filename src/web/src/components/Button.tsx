import { FC } from "react";
import { button } from "./Button.css";

interface ButtonProps {
  children: React.ReactElement | string;
  onClick?: () => void;
  disabled?: boolean;
  className?: keyof typeof button;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
}) => (
  <button
    className={button[className || "default"]}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);

export const ButtonPrimary: FC<ButtonProps> = (props) => (
  <Button {...props} className={"primary"} />
);
