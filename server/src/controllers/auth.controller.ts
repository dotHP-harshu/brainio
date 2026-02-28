import { Request, Response } from "express";
import userModel, { UserInterface } from "../models/user.model";
import { sendError, sendResponse } from "../utils/responseFormatter";
import config from "../config/config";

const meController = (req: Request, res: Response) => {
  const requestUser = req.user as UserInterface;
  const me = {
    _id: requestUser._id,
    createAt: requestUser.createdAt,
    email: requestUser.email,
    photos: requestUser.photo,
    userName: requestUser.userName,
  };

  sendResponse(res, me, "My details found successfully.", true, 200);
};

// change the user avatar

export const changePhotoController = async (req: Request, res: Response) => {
  try {
    const { photoUrl } = req.body;
    const user = req.user as UserInterface;
    if (!photoUrl) {
      return sendError(res, "Photo url is required", false, 400);
    }

    const savedUser = await userModel.findById(user._id);
    if (!savedUser) {
      return sendError(res, "User not found.", false, 400);
    }

    savedUser.photo = photoUrl;
    savedUser.save();

    res.redirect("/auth/me");
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    return sendError(
      res,
      "Error on server while changing the photo",
      false,
      400,
    );
  }
};

const logoutController = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      const error = err as Error;
      return sendError(res, "Error on logout", false, 500);
    }
    req.session.destroy((err) => {
      if (err) {
        const error = err as Error;
        return sendError(res, "Error on destroying session", false, 500);
      }
      res.clearCookie("connect.sid");

      //   return sendResponse(res, null, "Logged out successfully", true, 200);
      res.redirect(`${config.CLIENT_URL}/login`);
    });
  });
};

export { meController, logoutController };
