import { getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../business/repositories/DesenvolvedorRepository";
import { Desenvolvedor } from "../business/entities/Desenvolvedor";
import { ErroNotFound } from "../infra/http/errors/erroNotFound";

export class ObterDesenvolvedorService {
  async obter(id: number): Promise<Desenvolvedor> {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedor = await desenvolvedorRepository.findOne(id);
    if (!desenvolvedor) {
      throw new ErroNotFound("Desenvolvedor não encontrado");
    }

    return desenvolvedor;
  }
}
