"use client";
import { IconFidgetSpinner } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Skeleton } from "./skeleton";

interface Props {
  isLoading?: boolean;
  children?: ReactNode;
}

export const Loader = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return <Skeleton />;
  }
  return children;
};
