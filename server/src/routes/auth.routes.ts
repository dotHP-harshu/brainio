import express from "express";
import type { Response, Request } from "express";
import passport from "passport";
import config from "../config/config";
import { sendError, sendResponse } from "../utils/responseFormatter";
import authMiddleware from "../middleware/auth.middle";
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
    res.redirect("/auth/me");
  },
);

AuthRouter.get("/me", authMiddleware, (req: Request, res: Response) => {
  const me = req.user;
  sendResponse(res, me, "My details found successfully.", true, 200);
});

AuthRouter.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      const error = err as Error;
      return sendError(res, error, "Error on logout", false, 500);
    }
    req.session.destroy((err) => {
      if (err) {
        const error = err as Error;
        return sendError(res, error, "Error on destroying session", false, 500);
      }
      res.clearCookie("connect.sid");

      return sendResponse(res, null, "Logged out successfully", true, 200);
      // res.redirect(`${config.CLIENT_URL}/login`);
    });
  });
});
export default AuthRouter;
