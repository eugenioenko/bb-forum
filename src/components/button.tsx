import { ReactNode } from "react";
import { IconFidgetSpinner } from "@tabler/icons-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = ({
  children,
  type,
  disabled,
  isLoading,
}: ButtonProps) => {
  type = type ? type : "button";
  return (
    <button type={type} disabled={disabled || isLoading} data-test-id="button">
      {isLoading && <IconFidgetSpinner className="animate-spin" />}
      {children}
    </button>
  );
};
