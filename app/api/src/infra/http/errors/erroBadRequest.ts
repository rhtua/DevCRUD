import { ErroBase } from "./erroBase";
import { statusHttp } from "../statushttp";

export class ErroBadRequest extends ErroBase {
  constructor(
    description = "Bad Request.",
    statusCode = statusHttp.BAD_REQUEST
  ) {
    super(description, statusCode);
  }
}
