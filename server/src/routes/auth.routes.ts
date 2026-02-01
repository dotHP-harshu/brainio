import express from "express";
import type { Response, Request } from "express";
import passport from "passport";
import config from "../config/config";
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

AuthRouter.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    return console.log("Logout Error", err);
  });
  req.session.destroy((err) => {
    console.log("Error on destroying session", err);
  });
});
export default AuthRouter;
