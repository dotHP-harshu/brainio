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

export type ObjectiveQuestionInterface = {
  id: number;
  type: "objective";
  question: string;
  options: [string, string, string, string];
  hint: string;
  correctAnswer: string;
  expectedPoints: number;
};

export type SubjectiveQuestionInterface = {
  id: number;
  type: "subjective";
  question: string;
  options: "";
  hint: string;
  correctAnswer: string;
  expectedPoints: number;
};

export type PromptReducerActionType =
  | { type: "SET_USER_QUERY"; payload: string }
  | { type: "SET_TEST_TYPE"; payload: TestStyleType }
  | { type: "SET_DIFFICULTY"; payload: TestDifficultyTypes }
  | { type: "SET_QUESTION_COUNT"; payload: number }
  | { type: "RESET_PROMPT" };

export interface AnswerInterface {
  question: ObjectiveQuestionInterface | SubjectiveQuestionInterface;
  userAnswer: string;
}

export interface AnswerContextInterface {
  answers: AnswerInterface[];
}

export type AnswerActionInterface = {
  type: "SET_ANSWER";
  payload: { id: number; ans: string };
};

export interface TestDataInterface {
  difficulty: TestDifficultyTypes;
  testTitle: string;
  questions: ObjectiveQuestionInterface[] | SubjectiveQuestionInterface[];
}
export interface SubmitTestInterface {
  title: string;
  timeSpent: number;
  numberOfQuestions: number;
  difficulty: TestDifficultyTypes;
  answers: AnswerInterface[];
}

export interface TestContextInterface {
  test: TestDataInterface | null;
  setTest: (test: TestDataInterface | null) => void;
}

export interface TestResultInterface {
  title: string;
  result: "Passed" | "Failed";
  resultLabel: "Excellent" | "Good" | "Average" | "Poor";
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  accuracyRate: number;
  aiInsight: string;
}

export interface ResultContextInterface{
  testResult:TestResultInterface | null
  setTestResult:(test:TestResultInterface)=>void
}