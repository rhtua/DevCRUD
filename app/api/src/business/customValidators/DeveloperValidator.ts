import { validate } from "class-validator";
import { Developer } from "../entities/Developer";
import { ErrorBadRequest } from "../../infra/http/errors/errorBadRequest";

export async function developerValidator(dev: Developer) {
  const errors = await validate(dev);

  if (errors.length > 0) {
    const invalidProperties = errors.map((valor) => valor.property);
    const plural = errors.length > 1;
    throw new ErrorBadRequest(
      `O${plural ? "s" : ""} campo${plural ? "s" : ""} ${invalidProperties.join(
        ", "
      )} est${plural ? "ão" : "á"} preenchido${
        plural ? "s" : ""
      } incorretamente!`
    );
  }
}
