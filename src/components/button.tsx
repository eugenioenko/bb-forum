import { ReactNode } from "react";
import { IconFidgetSpinner } from "@tabler/icons-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  isIcon?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = ({
  children,
  type,
  disabled,
  isLoading,
  isIcon,
  ...rest
}: ButtonProps) => {
  type = type ? type : "button";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      data-test-id="button"
      className={isIcon ? "" : "min-w-28"}
      {...rest}
    >
      {isLoading ? <IconFidgetSpinner className="animate-spin" /> : children}
    </button>
  );
};
