import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../business/repositories/DesenvolvedorRepository";
import { ErroNotFound } from "../infra/http/errors/erroNotFound";
import { ValidarParametrosQuery } from "../business/customValidators/ValidarParametrosQuery";

export class ObterDesenvolvedoresPorQueryEPaginacaoService {
  async buscar(
    pagina?: string,
    limite?: string,
    termo?: string,
    busca?: string
  ) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    ValidarParametrosQuery(pagina, limite, termo, busca);

    const desenvolvedores = await desenvolvedorRepository.obterPaginado(
      Number.parseInt(pagina || ""),
      Number.parseInt(limite || ""),
      termo,
      busca
    );

    if (desenvolvedores.registros == 0) {
      throw new ErroNotFound("Nenhum desenvolvedor encontrado");
    }

    return desenvolvedores;
  }
}
