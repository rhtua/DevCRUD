import { ErroNotFound } from "../../infra/http/errors/erroNotFound";
import { Desenvolvedor } from "../entities/Desenvolvedor";

enum Colunas {
  nome = "nome",
  sexo = "sexo",
  idade = "idade",
  hobby = "hobby",
  datanascimento = "datanascimento",
}

export function ValidarParametrosQuery(
  pagina?: string,
  limite?: string,
  termo?: string,
  busca?: string
) {
  function ehColunaValida(termo: string) {
    const colunas = Object.getOwnPropertyNames(Colunas);
    return colunas.includes(termo.toLowerCase());
  }

  if (limite !== undefined && pagina !== undefined) {
    if (isNaN(Number.parseInt(pagina)) || isNaN(Number.parseInt(limite))) {
      throw new ErroNotFound(
        "Valores inseridos para página e/ou limite incorretos"
      );
    }
    if (Number.parseInt(pagina) <= 0 || Number.parseInt(limite) <= 0) {
      throw new ErroNotFound(
        "Pagina e/ou limite não podem ser preenchidos com valores negativos"
      );
    }
  }

  if (termo !== undefined && !ehColunaValida(termo)) {
    throw new ErroNotFound("O termo deve conter uma propriedade válida");
  }
}
