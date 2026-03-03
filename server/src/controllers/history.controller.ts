import { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/responseFormatter";
import historyModel from "../models/history.model";
import completedTestModel from "../models/completedTest.model";
import { UserInterface } from "../models/user.model";

// GET REQUESTs
export const getHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (!userId) return sendError(res, "UserId not found", true, 200);

    const history = await historyModel.findOne({ userId });
    if (!history) return sendError(res, "No history found", true, 200);

    return sendResponse(res, history, "History found successfully.", true, 200);
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    sendError(res, "Error on the testGeneration controller.", false, 400);
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserInterface;
    const userId = user._id;
    const { limit: limitQuery, page: pageQuery, search } = req.query;

    const limit = limitQuery ? Number(limitQuery) : 5;
    const page = pageQuery ? Number(pageQuery) : 1;
    const skip = (page - 1) * limit;

    let filter: any = {
      userId,
    };

    if (search) {
      filter = {
        userId,
        title: { $regex: search, $options: "i" },
      };
    }

    const tests = await completedTestModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalDocs = await completedTestModel.countDocuments(filter);

    sendResponse(
      res,
      {
        tests,
        limit,
        page,
        totalPage: Math.ceil(totalDocs / limit),
      },
      "Get tests success fully",
      true,
      200,
    );

    if (!userId) return sendError(res, "UserId not found", false, 400);
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    return sendError(res, "Error on the getTests controller.", false, 400);
  }
};

// POST REQUESTs
export const deleteTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;

    const test = await completedTestModel.findByIdAndDelete(testId);
    return sendResponse(res, test, "Test deleted successfully.", true, 200);
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    sendError(res, "Error on the deleteTest controller.", false, 400);
  }
};

export const setTest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return sendResponse(res, {}, "UserId not found", false, 400);
    }
    if (!req.body) {
      return sendError(res, "Body not found", false, 400);
    }

    const {
      title,
      difficulty,
      result,
      resultLabel,
      correctAnswers,
      totalQuestions,
      timeSpent,
      accuracyRate,
      aiInsight,
    } = req.body;

    const test = await completedTestModel.create({
      userId,
      title,
      result,
      resultLabel,
      correctAnswers,
      totalQuestions,
      difficulty,
      timeSpent,
      accuracyRate,
      aiInsight,
    });
    if (!test) {
      return sendResponse(res, {}, "Failed to save test.", false, 400);
    }

    // Find or create history document for the user
    let history = await historyModel.findOne({ userId });
    console.log(history);

    if (!history) {
      history = await historyModel.create({
        userId,
        totalTests: 1,
        totalTime: timeSpent,
        completedTests: [test._id],
      });
    } else {
      history.totalTests = history.totalTests + 1;
      history.totalTime = history.totalTime + timeSpent;
      history.completedTests.push(test._id);
      await history.save();
    }

    sendResponse(
      res,
      "Test saved successfully.",
      "Test saved successfully.",
      true,
      200,
    );
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    return sendError(res, "Error on the getTests controller.", false, 400);
  }
};
