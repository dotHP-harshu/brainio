type ObjectiveQuestion = {
  id: number;
  type: "objective";
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  expectedPoints: number;
};

type SubjectiveQuestion = {
  id: number;
  type: "subjective";
  question: string;
  options: "";
  correctAnswer: string;
  expectedPoints: number;
};

export type GeneratedTestInterface = {
  testTitle: string;
  questions: (ObjectiveQuestion | SubjectiveQuestion)[];
};
