import express from "express";
import type { Response, Request } from "express";
import passport from "passport";
import config from "../config/config";
import authMiddleware from "../middleware/auth.middle";
import { changePhotoController, logoutController, meController,deleteUserController } from "../controllers/auth.controller";
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
AuthRouter.post("/changePhoto", authMiddleware, changePhotoController)
AuthRouter.get("/logout", logoutController );
AuthRouter.get("/delete", deleteUserController)



export default AuthRouter;
