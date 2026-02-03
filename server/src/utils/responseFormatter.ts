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
  message: string,
  success: boolean = false,
  status: number,
) => {
  res.send({ data:null , message, success, status });
};

export { sendError, sendResponse };
