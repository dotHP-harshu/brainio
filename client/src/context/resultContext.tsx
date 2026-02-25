import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { ResultContextInterface } from "../types/types";

const resultContext = createContext<ResultContextInterface | null>(null);

export const ResultContextProvider = ({ children }: PropsWithChildren) => {
  const [testResult, setTestResult] = useState<
    ResultContextInterface["testResult"]
  >(() => {
    const result = window.sessionStorage.getItem("brainio_result");
    if (result === "null") return null;
    if (result)
      return JSON.parse(result) as ResultContextInterface["testResult"];
    return null;
  });

  const getCurrentResult = (result: ResultContextInterface["testResult"]) => {
    setTestResult(result);
    window.sessionStorage.setItem("brainio_result", JSON.stringify(result));
  };

  return (
    <resultContext.Provider
      value={{ testResult, setTestResult: getCurrentResult }}
    >
      {children}
    </resultContext.Provider>
  );
};

export const useResultContext = () => {
  const ctx = useContext(resultContext);
  if (!ctx) {
    throw new Error("Result context is not available");
  }
  return ctx;
};
