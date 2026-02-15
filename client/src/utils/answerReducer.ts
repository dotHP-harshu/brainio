import type { AnswerActionInterface, AnswerInterface } from "../types/types";

export const answerReducer = (
  state: AnswerInterface[],
  action: AnswerActionInterface,
): AnswerInterface[] => {
  switch (action.type) {
    case "SET_ANSWER":
      return state.map((a) =>
        a.question.id === action.payload.id
          ? { ...a, userAnswer: action.payload.ans }
          : a,
      );
    default:
      return state;
  }
};
