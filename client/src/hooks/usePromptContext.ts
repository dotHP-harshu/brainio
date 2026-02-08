import { useContext } from "react";
import { PromptContext } from "../context/PromptReducer";

export function usePromptContext() {
  const ctx = useContext(PromptContext);
  if (!ctx) {
    throw new Error(
      "usePromptContext must be used within PromptContextProvider",
    );
  }
  return ctx;
}
