import express from "express";
import type { Response, Request } from "express";
import passport from "passport";
import config from "../config/config";
import { sendError, sendResponse } from "../utils/responseFormatter";
import authMiddleware from "../middleware/auth.middle";
import userModel from "../models/user.model";
import { logoutController, meController } from "../controllers/auth.controller";
const AuthRouter = express.Router();

AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${config.CLIENT_URL}/login`,
  }),
  (req: Request, res: Response) => {

    res.redirect(`${config.CLIENT_URL}/profile`);
  },
);

AuthRouter.get("/me", authMiddleware, meController);

AuthRouter.get("/logout", logoutController );
export default AuthRouter;
