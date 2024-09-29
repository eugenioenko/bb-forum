import { ApiResponse } from "@/models/api-response";
import { useState } from "react";

export function usePageSkip<T>(response: ApiResponse<T>) {
  const [skip, setSkip] = useState(response.skip || 0);
  const initialData = response?.skip === skip ? response : undefined;
  return { initialData, skip, setSkip };
}
