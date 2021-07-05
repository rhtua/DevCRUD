import "./infra/database";
import "express-async-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { router } from "./routes";
import { ErroBase } from "./infra/http/errors/erroBase";
import { statusHttp } from "./infra/http/statushttp";

export class Server {
  api: Express;

  constructor() {
    this.api = express();
    this.api.use(express.json());
    this.api.use(router);

    this.api.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof ErroBase) {
          return response.status(err.statusCode).json({
            error: err.message,
          });
        }

        return response.status(statusHttp.INTERNAL_SERVER).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    );
  }

  listen(port: number = 3000, callback?: () => void) {
    this.api.listen(port, callback);
  }
}

new Server().listen(undefined, () => console.log("O servidor está de pé"));
