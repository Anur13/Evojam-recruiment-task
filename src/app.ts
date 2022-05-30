import express, { Express, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";

import { constants } from "./common/constants";
import { inviteRouter } from "./router/invite-router";
import APIError from "./error/baseError";
import swaggerUI from "swagger-ui-express";

const app: Express = express();
app.use(cors());

const loggerType = app.get("env") === "development" ? "dev" : "short";
app.use(logger(loggerType));
app.use(express.json());

app.use(constants.routes.invite.main, inviteRouter);
app.get("/health-check", (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };
  res.status(200).send(data);
});
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerDoc = require("../openapi.json");
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
} catch (e) {
  console.log(e);
}

// Handle error route
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "NOT FOUND" });
});

app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error?.statusCode || 400).send(error.message);
});

export { app };
