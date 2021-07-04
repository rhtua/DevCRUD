import { DesenvolvedorRepository } from "../business/repositories/DesenvolvedorRepository";
import { getCustomRepository } from "typeorm";
import { ObterDesenvolvedorService } from "./ObterDesenvolvedorService";
import { ErroBadRequest } from "../infra/http/errors/erroBadRequest";

export class ExcluirDesenvolvedorService {
  async excluir(id: number) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    try {
      const desenvolvedor = await new ObterDesenvolvedorService().obter(id);
      return await desenvolvedorRepository.remove(desenvolvedor);
    } catch (err) {
      throw new ErroBadRequest("Não foi possivel deletar");
    }
  }
}
