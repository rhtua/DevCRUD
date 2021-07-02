import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { Desenvolvedor } from "../entities/desenvolvedor";

export class ObterDesenvolvedoresService {
  async obterTodos(): Promise<Desenvolvedor[]> {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedores = await desenvolvedorRepository.find();
    if (desenvolvedores.length == 0) {
      throw new Error("Nenhum desenvolvedor encontrado");
    }

    return desenvolvedores;
  }
}
