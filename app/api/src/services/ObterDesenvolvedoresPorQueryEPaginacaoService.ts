import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";

export class ObterDesenvolvedoresPorQueryEPaginacaoService {
  async buscar(pagina: string, limite: string, termo: string, busca: string) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    if (
      (isNaN(Number.parseInt(pagina)) || isNaN(Number.parseInt(limite))) &&
      !(limite === undefined && pagina === undefined)
    ) {
      throw new Error("Valores inseridos para pégina e/ou limite incorretos");
    }

    const desenvolvedores = await desenvolvedorRepository.obterPaginado(
      Number.parseInt(pagina),
      Number.parseInt(limite),
      termo,
      busca
    );

    if (desenvolvedores.registros == 0) {
      throw new Error("Nenhum desenvolvedor encontrado");
    }

    return desenvolvedores;
  }
}
