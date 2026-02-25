import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { TestContextInterface } from "../types/types";

export const testContext = createContext<TestContextInterface | null>(null);

export const TestContextProvider = ({ children }: PropsWithChildren) => {
  const [test, setTest] = useState<TestContextInterface["test"]>(() => {
    const test = window.sessionStorage.getItem("brainio_test");
    if (test === "null") return null;
    if (test) return JSON.parse(test) as TestContextInterface["test"];
    return null;
  });

  const setCurrentTest = (test: TestContextInterface["test"]) => {
    setTest(test);
    window.sessionStorage.setItem("brainio_result", JSON.stringify(null));
    window.sessionStorage.setItem("brainio_test", JSON.stringify(test));
  };

  return (
    <testContext.Provider value={{ test, setTest: setCurrentTest }}>
      {children}
    </testContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(testContext);
  if (!context) {
    throw new Error("useTestContext must be used within a TestContextProvider");
  }
  return context;
};
