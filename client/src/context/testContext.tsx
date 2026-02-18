import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { TestContextInterface } from "../types/types";

export const testContext = createContext<TestContextInterface | null>(null);

export const TestContextProvider = ({ children }: PropsWithChildren) => {
    const [test, setTest] = useState<TestContextInterface["test"]>(null);
    

    return (
        <testContext.Provider value={{ test, setTest }}>
            {children}
        </testContext.Provider>
    );

}


export const useTestContext = () => {
    const context = useContext(testContext);
    if (!context) {
        throw new Error("useTestContext must be used within a TestContextProvider");
    }
    return context;
};
