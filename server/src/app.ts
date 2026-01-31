import type { Request, Response } from "express";

import express from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the Brainio Server.");
});

export default app;
