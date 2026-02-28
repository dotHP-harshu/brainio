import { ResultInterface } from "../types/types";

export const resultValidator = (result: any): boolean => {
  if (!result || typeof result !== "object") return false;

  const resultObject = result as ResultInterface;

  // validate title
  if (
    !resultObject.title ||
    typeof resultObject.title !== "string" ||
    resultObject.title.trim() === ""
  )
    return false;

  // validate difficulty
  if (
    !resultObject.difficulty ||
    typeof resultObject.difficulty !== "string" ||
    resultObject.difficulty.trim() === "" ||
    (resultObject.difficulty !== "Easy" &&
      resultObject.difficulty !== "Medium" &&
      resultObject.difficulty !== "Hard")
  )
    return false;

  // validate result
  if (
    !resultObject.result ||
    typeof resultObject.result !== "string" ||
    (resultObject.result !== "Failed" && resultObject.result !== "Passed")
  )
    return false;

  // validate resultLabel
  if (
    !resultObject.resultLabel ||
    typeof resultObject.resultLabel !== "string" ||
    (resultObject.resultLabel !== "Average" &&
      resultObject.resultLabel !== "Excellent" &&
      resultObject.resultLabel !== "Good" &&
      resultObject.resultLabel !== "Poor")
  )
    return false;

  // validate totalAnswer
  if (
    typeof resultObject.totalQuestions !== "number" ||
    !Number.isInteger(resultObject.totalQuestions) ||
    resultObject.totalQuestions <= 0
  )
    return false;

  // validate correctAnswers
  if (
    typeof resultObject.correctAnswers !== "number" ||
    !Number.isInteger(resultObject.correctAnswers) ||
    resultObject.correctAnswers < 0 ||
    resultObject.correctAnswers > resultObject.totalQuestions
  )
    return false;

  // validate timeSpent
  if (
    typeof resultObject.timeSpent !== "number" ||
    !Number.isInteger(resultObject.timeSpent)
  )
    return false;

  // validate accuracyRate
  if (
    typeof resultObject.accuracyRate !== "number" ||
    !Number.isInteger(resultObject.accuracyRate) ||
    resultObject.accuracyRate < 0 ||
    resultObject.accuracyRate > 100
  )
    return false;

  // validate aiInsight
  if (
    !resultObject.aiInsight ||
    typeof resultObject.aiInsight !== "string" ||
    resultObject.aiInsight.trim() === ""
  )
    return false;

  return true;
};

export function isValidResult(result: unknown): result is ResultInterface {
  return resultValidator(result);
}
