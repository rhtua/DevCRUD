import { ErrorBase } from "./errorBase";
import { statusHttp } from "../statushttp";

export class ErrorBadRequest extends ErrorBase {
  constructor(
    description = "Bad Request.",
    statusCode = statusHttp.BAD_REQUEST
  ) {
    super(description, statusCode);
  }
}
