import type { Request, Response } from "express";

import express from "express";
import passport from "./config/passport";
import expressSession from "express-session";
import config from "./config/config";
import cors from "cors";
const app = express();

app.use(
  expressSession({
    secret: config.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie:{
      maxAge:7*24*60*60*1000,
      sameSite:"strict",
      httpOnly:true,
      secure:false
    }
  }),
);

// body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes Importations
import AuthRouter from "./routes/auth.routes";
import TestRouter from "./routes/test.route";
import HistoryRouter from "./routes/history.routes";

// Route Declaration
app.use("/auth", AuthRouter);
app.use("/tests", TestRouter);
app.use("/history", HistoryRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the Brainio Server.");
});

export default app;
