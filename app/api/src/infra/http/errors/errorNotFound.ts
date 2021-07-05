import { ErrorBase } from "./errorBase";
import { statusHttp } from "../statushttp";

export class ErrorNotFound extends ErrorBase {
  constructor(description = "Not found.", statusCode = statusHttp.NOT_FOUND) {
    super(description, statusCode);
  }
}
