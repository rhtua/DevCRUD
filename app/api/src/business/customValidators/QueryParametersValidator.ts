import { ErrorNotFound } from "../../infra/http/errors/errorNotFound";
import { Developer } from "../entities/Developer";

enum Fields {
  nome = "nome",
  sexo = "sexo",
  idade = "idade",
  hobby = "hobby",
  datanascimento = "datanascimento",
}

export function queryParametersValidator(
  page?: string,
  limit?: string,
  field?: string,
  search?: string
) {
  function isValidField(field: string) {
    const fields = Object.getOwnPropertyNames(Fields);
    return fields.includes(field.toLowerCase());
  }

  if (limit !== undefined && page !== undefined) {
    const pageNumber = Number.parseInt(page);
    const limitNumber = Number.parseInt(limit);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      limitNumber < 1 ||
      pageNumber < 1
    ) {
      throw new ErrorNotFound(
        "Valores inseridos para página e/ou limite incorretos"
      );
    }
    if (Number.parseInt(page) <= 0 || Number.parseInt(limit) <= 0) {
      throw new ErrorNotFound(
        "Pagina e/ou limite não podem ser preenchidos com valores negativos"
      );
    }
  }

  if (field !== undefined && !isValidField(field)) {
    throw new ErrorNotFound("O termo deve conter uma propriedade válida");
  }
}
