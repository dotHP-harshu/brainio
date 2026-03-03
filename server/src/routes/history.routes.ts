import express from "express";
import {
  deleteTest,
  getHistory,
  getTests,
  setTest,
} from "../controllers/history.controller";
import authMiddleware from "../middleware/auth.middle";
const HistoryRouter = express.Router();

HistoryRouter.get("/get/state/:userId", getHistory);
HistoryRouter.get("/get/tests",authMiddleware, getTests);
HistoryRouter.post("/delete/test/:testId", deleteTest);
HistoryRouter.post("/set/test/:userId", setTest);

export default HistoryRouter;
