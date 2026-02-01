import { Response } from "express";

const sendResponse = (
  res: Response,
  data: any,
  message: string,
  success: boolean = true,
  status: number = 200,
) => {
  res.send({ data, message, success, status });
};
const sendError = (
  res: Response,
  err: Error | null,
  message: string,
  success: boolean = false,
  status: number,
) => {
  res.send({ err, message, success, status });
};

export { sendError, sendResponse };
