import { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/responseFormatter";
import { testGenerationFunction } from "../utils/testGenerator";
import { evaluateTest } from "../utils/testEvaluator";
import { EXPLAIN_MISTAKE_PROMPT, CHEAT_SHEET_PROMPT } from "../utils/prompts";
import OpenAI from "openai";
import config from "../config/config";

const openai = new OpenAI({
  apiKey: config.OPEN_ROUTER_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateTestController(req: Request, res: Response) {
  const { prompt } = req.body;

  if (!prompt) {
    return sendError(res, "Prompt is required", false, 400);
  }

  try {
    const generatedTest = await testGenerationFunction(
      JSON.stringify(prompt),
      1
    );
    return sendResponse(
      res,
      generatedTest,
      "generated test successfully.",
      true,
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    sendError(res, "Error on the testGeneration controller.", false, 400);
  }
}

export async function evaluateTestController(req: Request, res: Response) {
  const { test } = req.body;

  if (!test) return sendError(res, "Test not found", false, 400);

  try {
    const generatedResult = await evaluateTest(JSON.stringify(test), 1);
    return sendResponse(
      res,
      generatedResult,
      "Test evaluated successfully",
      true,
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    sendError(res, "Error on the evaluateTest controller.", false, 400);
  }
}

export async function explainMistakeController(req: Request, res: Response) {
  const { question, correctAnswer, userAnswer } = req.body;

  if (!question || !correctAnswer || !userAnswer) {
    return sendError(res, "question, correctAnswer, and userAnswer are required", false, 400);
  }

  try {
    const prompt = EXPLAIN_MISTAKE_PROMPT
      .replace("{question}", question)
      .replace("{correctAnswer}", correctAnswer)
      .replace("{userAnswer}", userAnswer);

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
    });

    const explanation = completion.choices[0]?.message?.content || "";

    return sendResponse(res, { explanation }, "Explanation generated successfully", true, 200);
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    sendError(res, "Error generating explanation.", false, 400);
  }
}

export async function generateCheatSheetController(req: Request, res: Response) {
  const { topic, difficulty } = req.body;

  if (!topic || !difficulty) {
    return sendError(res, "topic and difficulty are required", false, 400);
  }

  try {
    const prompt = CHEAT_SHEET_PROMPT
      .replace("{topic}", topic)
      .replace("{difficulty}", difficulty);

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
    });

    const cheatSheet = completion.choices[0]?.message?.content || "";

    return sendResponse(res, { cheatSheet }, "Cheat sheet generated successfully", true, 200);
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    sendError(res, "Error generating cheat sheet.", false, 400);
  }
}
