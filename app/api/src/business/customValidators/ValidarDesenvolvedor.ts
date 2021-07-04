import { validate } from "class-validator";
import { Desenvolvedor } from "../entities/Desenvolvedor";
import { ErroBadRequest } from "../../infra/http/errors/erroBadRequest";

export async function validarDesenvolvedor(dev: Desenvolvedor) {
  const erros = await validate(dev);

  if (erros.length > 0) {
    const locaisIncorretos = erros.map((valor) => valor.property);
    const plural = erros.length > 1;
    throw new ErroBadRequest(
      `O${plural ? "s" : ""} campo${plural ? "s" : ""} ${locaisIncorretos.join(
        ", "
      )} est${plural ? "ão" : "á"} preenchido${
        plural ? "s" : ""
      } incorretamente!`
    );
  }
}
