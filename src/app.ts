import express, { Express, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";

import { constants } from "./common/constants";
import { inviteRouter } from "./router/invite-router";
import APIError from "./error/baseError";

const app: Express = express();
app.use(cors());

const loggerType = app.get("env") === "development" ? "dev" : "short";
app.use(logger(loggerType));
app.use(express.json());

app.use(constants.routes.invite.main, inviteRouter);

// Handle error route
app.use((req, res) => {
  res.status(404).json({ error: "NOT FOUND" });
});

app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error?.statusCode || 400).send(error.message);
});

export { app };
