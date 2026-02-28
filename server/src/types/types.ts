type ObjectiveQuestion = {
  id: number;
  type: "objective";
  question: string;
  options: [string, string, string, string];
  hint: string;
  correctAnswer: string;
  expectedPoints: number;
};

type SubjectiveQuestion = {
  id: number;
  type: "subjective";
  question: string;
  options: "";
  hint: string;
  correctAnswer: string;
  expectedPoints: number;
};

export type GeneratedTestInterface = {
  testTitle: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: (ObjectiveQuestion | SubjectiveQuestion)[];
};

export type ResultInterface = {
  title: string;
  result: "Passed" | "Failed";
  difficulty: "Easy" | "Medium" | "Hard";
  resultLabel: "Excellent" | "Good" | "Average" | "Poor";
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  accuracyRate: number;
  aiInsight: string;
};
