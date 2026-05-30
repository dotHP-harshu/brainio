import { Request, Response } from "express";
import userModel, { UserInterface } from "../models/user.model";
import { sendError, sendResponse } from "../utils/responseFormatter";
import config from "../config/config";
import historyModel from "../models/history.model";
import completedTestModel from "../models/completedTest.model";
import deletedUserModel from "../models/deletedUser.model";
import { revokeGoogleAccess } from "../utils/revokeGoogle";

export const meController = (req: Request, res: Response) => {
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

export const logoutController = async (req: Request, res: Response) => {
  try {
    req.logout((err) => {
      if (err) {
        return sendError(res, "Logout failed", false, 500);
      }

      req.session.destroy((err) => {
        if (err) {
          return sendError(res, "Session destroy failed", false, 500);
        }

        res.clearCookie("connect.sid", { path: "/" });

        res.redirect(`${config.CLIENT_URL}/login`);
      });
    });
  } catch (error) {
    return sendError(res, "Logout error", false, 500);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserInterface;
    if (!user) {
      return sendError(res, "You are not authenticated.", false, 400);
    }
    revokeGoogleAccess(user.accessToken);
    const savedUser = await userModel.findOneAndDelete({ email: user.email });
    if (!savedUser) {
      return sendError(res, "user not found", false, 400);
    }

    const savedHistory = await historyModel.findOneAndDelete({
      userId: savedUser._id,
    });
    const savedTests = await completedTestModel.deleteMany({
      userId: savedUser._id,
    });
    const deletedUser = await deletedUserModel.create({
      email: savedUser.email,
      userName: savedUser.userName,
    });

    res.redirect(`${config.CLIENT_URL}/login`);
    // sendResponse(
    //   res,
    //   { user: savedUser, history: savedHistory, tests: savedTests },
    //   "User account is deleted successfully.",
    //   true,
    //   200,
    // );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return sendError(res, error.message, false, 400);
    }
    return sendError(res, "Error on the delete user controller.", false, 400);
  }
};
