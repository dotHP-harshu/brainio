import express from "express"
import { generateTestController } from "../controllers/test.controller";
const TestRouter = express.Router();


TestRouter.post("/generate", generateTestController)



export default TestRouter