import { FC, ReactNode } from "react";
import { IconFidgetSpinner } from "@tabler/icons-react";

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button: FC<Props> = ({ children, type, disabled, isLoading }) => {
  type = type ? type : "button";
  return (
    <button type={type} disabled={disabled || isLoading} data-test-id="button">
      {isLoading && <IconFidgetSpinner className="animate-spin" />}
      {children}
    </button>
  );
};
