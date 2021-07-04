import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../business/repositories/DesenvolvedorRepository";
import { Desenvolvedor } from "../business/entities/Desenvolvedor";

export class ObterDesenvolvedoresService {
  async obterTodos(): Promise<Desenvolvedor[]> {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedores = await desenvolvedorRepository.find();

    return desenvolvedores;
  }
}
