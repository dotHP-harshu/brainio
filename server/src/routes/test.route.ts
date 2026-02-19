import express from "express";
import {
  generateTestController,
  evaluateTestController,
} from "../controllers/test.controller";
const TestRouter = express.Router();

TestRouter.post("/generate", generateTestController);
TestRouter.post("/evaluate", evaluateTestController);

export default TestRouter;
