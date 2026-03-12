import type { NextFunction, Request, Response } from "express";

import express from "express";
import passport from "./config/passport";
import expressSession from "express-session";
import config from "./config/config";
import MongoStore from "connect-mongo";
import cors from "cors";
const app = express();
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Ensure DB is connected before handling requests
// In Serverless, we should await the connection but cache the promise
let cachedDb: any = null;

app.use(async (req, res, next) => {
  if (!cachedDb) {
    try {
      cachedDb = await dbConnection();
    } catch (err) {
      return res.status(500).json({ message: "DB Connection Error" });
    }
  }
  next();
});

app.set("trust proxy", 1);

app.use(
  expressSession({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: config.MONGOOSE_URI,
      autoRemove: "native",
      ttl: 7 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
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
import dbConnection from "./config/dbConnection";

// Route Declaration
app.use("/auth", AuthRouter);
app.use("/tests", TestRouter);
app.use("/history", HistoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the Brainio Server.");
});

export default app;
