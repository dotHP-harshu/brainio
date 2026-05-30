import express from "express";
import {
  generateTestController,
  evaluateTestController,
  explainMistakeController,
  generateCheatSheetController,
} from "../controllers/test.controller";
const TestRouter = express.Router();

TestRouter.post("/generate", generateTestController);
TestRouter.post("/evaluate", evaluateTestController);
TestRouter.post("/explain-mistake", explainMistakeController);
TestRouter.post("/cheatsheet", generateCheatSheetController);

export default TestRouter;
