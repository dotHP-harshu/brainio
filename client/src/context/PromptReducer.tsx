import { createContext, useReducer, type PropsWithChildren } from "react";
import type {
  PromptInterface,
  PromptContextInterface,
  TestStyleType,
  TestDifficultyTypes,
  PromptReducerActionType
} from "../types/types";


const DEFAULT_PROMPT : PromptInterface= {
    userQuery: "",
    questionCount: 10,
    testType: "MCQ",
    difficulty: "Easy",
  }

function promptReducer(
  prompt: PromptInterface,
  action: PromptReducerActionType,
): PromptInterface {
  switch (action.type) {
    case "SET_DIFFICULTY":
      return { ...prompt, difficulty: action.payload };
    case "SET_QUESTION_COUNT":
      return { ...prompt, questionCount: action.payload };
    case "SET_TEST_TYPE":
      return { ...prompt, testType: action.payload };
    case "SET_USER_QUERY":
      return { ...prompt, userQuery: action.payload };
    case "RESET_PROMPT":
      return {...DEFAULT_PROMPT}
    default:
      return prompt;
  }
}



export const PromptContext = createContext<PromptContextInterface | undefined>(undefined);

export function PromptContextProvider({ children }: PropsWithChildren) {
  const [prompt, dispatch] = useReducer(promptReducer, DEFAULT_PROMPT)

  const changeUserQuery = (text: string) => {
    return dispatch({type: "SET_USER_QUERY", payload:text})
  };
  const changeQuestionCount = (questions: number) => {
    dispatch({type:'SET_QUESTION_COUNT', payload:questions})
  };
  const changeTestType = (testType: TestStyleType) => {
    return dispatch({type:"SET_TEST_TYPE", payload:testType})
  };
  const changeDifficulty = (difficulty: TestDifficultyTypes) => {
    return dispatch({type:"SET_DIFFICULTY", payload:difficulty})
  };
  const resetPrompt =()=>{
    return dispatch({type:"RESET_PROMPT"})
  }

  return (
    <PromptContext.Provider
      value={{
        prompt,
        changeDifficulty,
        changeQuestionCount,
        changeTestType,
        changeUserQuery,
        resetPrompt
      }}
    >
      {children}
    </PromptContext.Provider>
  );
}
