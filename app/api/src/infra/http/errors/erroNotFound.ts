import { ErroBase } from "./erroBase";
import { statusHttp } from "../statushttp";

export class ErroNotFound extends ErroBase {
  constructor(description = "Not found.", statusCode = statusHttp.NOT_FOUND) {
    super(description, statusCode);
  }
}
