import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { Desenvolvedor } from "../entities/desenvolvedor";

export class ObterDesenvolvedorService {
  async obter(id: number): Promise<Desenvolvedor> {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedor = await desenvolvedorRepository.findOne(id);
    if (!desenvolvedor) {
      throw new Error("Desenvolvedor não encontrado");
    }

    return desenvolvedor;
  }
}
