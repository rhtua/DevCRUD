import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { getCustomRepository } from "typeorm";
import { ObterDesenvolvedorService } from "./ObterDesenvolvedorService";

export class ExcluirDesenvolvedorService {
  async excluir(id: number) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedor = await new ObterDesenvolvedorService().obter(id);

    return await desenvolvedorRepository.remove(desenvolvedor);
  }
}
