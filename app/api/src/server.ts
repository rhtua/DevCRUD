import "./database";
import "express-async-errors"
import express, {NextFunction, Request, Response} from "express";
import "reflect-metadata";
import { router } from "./routes";

const api = express();

api.use(express.json());
api.use(router);

api.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

api.listen(3000, () => console.log("O servidor está de pé"));
