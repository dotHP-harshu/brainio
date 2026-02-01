import type { Request, Response } from "express";

import express from "express";
import AuthRouter from "./routes/auth.routes";
import passport from "./config/passport"
import expressSession from "express-session"
import config from "./config/config";
const app = express();

app.use(expressSession({
  secret:config.SESSION_SECRET,
  saveUninitialized:true,
  resave:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", AuthRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the Brainio Server.");
});

export default app;
