import { NextFunction, Request, Response } from "express";
import { sendError, sendResponse } from "../utils/responseFormatter";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) return sendError(res, "You are not authorised.", false, 401);

  next();
}
