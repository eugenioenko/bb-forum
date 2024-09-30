import { ApiResponse } from "@/models/api-response";
import { useState } from "react";

export function usePageSkip<T>(response: ApiResponse<T>) {
  const [skip, setSkipValue] = useState(response.args?.skip || 0);
  const initialData = response?.args?.skip === skip ? response : undefined;

  const setSkip = (skip: number): void => {
    setSkipValue(skip);
    let url = new URL(window.location.href);
    url.searchParams.set("skip", `${skip}`);
    window.history.pushState(null, "", url);
  };

  return { initialData, skip, setSkip };
}
