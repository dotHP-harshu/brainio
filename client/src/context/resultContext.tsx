import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { ResultContextInterface } from "../types/types";

const resultContext = createContext<ResultContextInterface | null>(null)

export const ResultContextProvider = ({ children }: PropsWithChildren) => {

    const [testResult, setTestResult] = useState<ResultContextInterface["testResult"]>(null)


    return (
        <resultContext.Provider value={{ testResult, setTestResult }} >
            {children}
        </resultContext.Provider>
    )

}

export const useResultContext = () => {
    const ctx = useContext(resultContext)
    if (!ctx) {
        throw new Error("Result context is not available")
    }
    return ctx
}