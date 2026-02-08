import OpenAI from "openai";
import config from "../config/config";
import { GENERATION_PROMPT } from "./prompts";
import isValidTest from "./testValidator";
import { GeneratedTestInterface } from "../types/types";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: config.OPEN_ROUTER_KEY,
});

const MAX_ATTEMPTS = 3;

function extractJSON(text: string): unknown {
  try {
    return JSON.parse(
      text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch {
    return null;
  }
}

export async function testGenerationFunction(
  prompt: string,
  attempt = 1,
): Promise<GeneratedTestInterface> {
  const PROMPT = `
${GENERATION_PROMPT}
Create a test using the following details:

${prompt}

Return ONLY valid JSON.
`;

  const completion = await openai.chat.completions.create({
    model: "google/gemma-3-12b-it:free",
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

  if (parsed && isValidTest(parsed)) {
    return parsed;
  }

  if (attempt >= MAX_ATTEMPTS) {
    throw new Error("AI failed to generate valid test format");
  }

  return testGenerationFunction(prompt, attempt + 1);
}
