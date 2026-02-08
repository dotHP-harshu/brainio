export type TestStyleType = "Q&A" | "MCQ";
export type TestDifficultyTypes = "Hard" | "Easy" | "Medium";

export interface UserInterFace {
  email: string;
  userName: string;
  photos: string;
}

export interface ResponseInterface<T> {
  data: T | null;
  error: string | null;
}

export type MethodType = "GET" | "POST";

export interface ServerResponseInterface<T> {
  message: string;
  status: number;
  success: boolean;
  data: T | null;
}

export interface UserContextType {
  user: UserInterFace | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

export interface TrendingTopicInterface {
  name: string;
  questions: number;
  testType: TestStyleType;
  difficulty: TestDifficultyTypes;
}

export interface PromptInterface {
  questionCount: number;
  difficulty: TestDifficultyTypes;
  testType: TestStyleType;
  userQuery: string;
}

export interface PromptContextInterface {
  prompt: PromptInterface;
  changeTestType: (testType: TestStyleType) => void;
  changeDifficulty: (difficulty: TestDifficultyTypes) => void;
  changeQuestionCount: (questions: number) => void;
  changeUserQuery: (text: string) => void;
  resetPrompt: () => void;
}

export type PromptReducerActionType =
  | { type: "SET_USER_QUERY"; payload: string }
  | { type: "SET_TEST_TYPE"; payload: TestStyleType }
  | { type: "SET_DIFFICULTY"; payload: TestDifficultyTypes }
  | { type: "SET_QUESTION_COUNT"; payload: number }
  | { type: "RESET_PROMPT" };
