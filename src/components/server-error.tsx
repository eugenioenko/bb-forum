import { FC } from "react";

interface Props {
  error?: unknown;
}

export const ServerError: FC<Props> = ({ error }) => {
  let message = "Unexpected server error";
  if (typeof error === "string") {
    message = error;
  } else if (error && typeof error?.toString === "function") {
    message = error.toString();
  }
  return (
    <div className="mt-4">
      <div className="card p-4 text-danger font-normal">{message}</div>
    </div>
  );
};
