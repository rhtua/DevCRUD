import "./infra/database";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { router } from "./routes";
import { ErroBase } from "./infra/http/errors/erroBase";
import { statusHttp } from "./infra/http/statushttp";

const api = express();

api.use(express.json());
api.use(router);

api.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
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

api.listen(3000, () => console.log("O servidor está de pé"));
