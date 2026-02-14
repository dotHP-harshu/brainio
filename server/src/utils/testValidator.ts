import { GeneratedTestInterface } from "../types/types";

function validateTest(test: unknown): boolean {
  if (typeof test !== "object" || !test) return false;

  // Record<string, unknown> is a TypeScript utility type that represents an object with string keys and values of any type.
  const testObj = test as Record<string, unknown>;

  // validate test tiltle
  if (
    !testObj.testTitle ||
    typeof testObj.testTitle !== "string" ||
    testObj.testTitle.trim() === ""
  )
    return false;

  // validate questions
  if (
    !testObj.questions ||
    !Array.isArray(testObj.questions) ||
    testObj.questions.length === 0
  )
    return false;

  const seenIds = new Set<number>();

  for (const ques of testObj.questions) {
    if (!ques || typeof ques !== "object") return false;
    const question = ques as Record<string, unknown>;

    // validate id
    if (typeof question.id !== "number") return false;
    if (seenIds.has(question.id)) return false;
    seenIds.add(question.id);

    // validate type
    if (question.type !== "subjective" && question.type !== "objective")
      return false;

    // validate question
    if (
      !question.question ||
      typeof question.question !== "string" ||
      question.question.trim() === ""
    )
      return false;

    // validate question
    if (
      !question.hint ||
      typeof question.hint !== "string" ||
      question.hint.trim() === ""
    )
      return false;

    // validate expected numbers
    if (
      typeof question.expectedPoints !== "number" ||
      question.expectedPoints <= 0
    )
      return false;

    // validate options
    if (question.type === "objective") {
      if (!Array.isArray(question.options) || question.options.length !== 4)
        return false;
      if (
        !question.options.every(
          (opt) => typeof opt === "string" && opt.trim() !== "",
        )
      ) {
        return false;
      }
      // validat correct answer
      if (
        !question.correctAnswer ||
        typeof question.correctAnswer !== "string" ||
        !question.options.includes(question.correctAnswer)
      )
        return false;
    } else if (question.type === "subjective") {
      if (question.options !== "") return false;
      // validate correct ans
      if (question.correctAnswer === "") return false;
    }
  }

  return true;
}

export default function isValidTest(
  test: unknown,
): test is GeneratedTestInterface {
  return validateTest(test);
}
