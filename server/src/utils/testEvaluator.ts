import OpenAI from "openai";
import config from "../config/config";
import { EVALUATION_PROMPT } from "./prompts";
import { extractJSON } from "./extractJson";
import { isValidResult } from "./resultValidator";
import { ResultInterface } from "../types/types";

const openai = new OpenAI({
  apiKey: config.OPEN_ROUTER_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MAX_ATTEMPTS = 2;

export const evaluateTest = async (
  test: any,
  attempt: number
): Promise<ResultInterface> => {
  const PROMPT = `
    ${EVALUATION_PROMPT}
    Create a test using the following details:
    
    ${test}
    
    Return ONLY valid JSON.
    `;

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: PROMPT,
      },
    ],
  });
  const rawText = completion.choices[0]?.message?.content;
  if (typeof rawText !== "string") {
    throw new Error("AI returned empty response");
  }

  const parsed = extractJSON(rawText);

  if (parsed && isValidResult(parsed)) {
    return parsed;
  }

  if (attempt >= MAX_ATTEMPTS) {
    throw new Error("AI failed to generate valid test format");
  }

  return evaluateTest(test, attempt + 1);
};
