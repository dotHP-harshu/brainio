import { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/responseFormatter";
import { testGenerationFunction } from "../utils/testGenerator";
import { evaluateTest } from "../utils/testEvaluator";

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
