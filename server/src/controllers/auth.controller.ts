import { Request, Response } from "express";
import { UserInterface } from "../models/user.model";
import { sendError, sendResponse } from "../utils/responseFormatter";
import config from "../config/config";

const meController = (req: Request, res: Response) => {
  const requestUser = req.user as UserInterface;
  const me = {
    _id:requestUser._id,
    createAt : requestUser.createdAt,
    email: requestUser.email,
    photos: requestUser.photo,
    userName: requestUser.userName,
  };

  sendResponse(res, me, "My details found successfully.", true, 200);
};
const logoutController = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      const error = err as Error;
      return sendError(res,  "Error on logout", false, 500);
    }
    req.session.destroy((err) => {
      if (err) {
        const error = err as Error;
        return sendError(res,  "Error on destroying session", false, 500);
      }
      res.clearCookie("connect.sid");

    //   return sendResponse(res, null, "Logged out successfully", true, 200);
      res.redirect(`${config.CLIENT_URL}/login`);
    });
  });
};

export { meController, logoutController };
