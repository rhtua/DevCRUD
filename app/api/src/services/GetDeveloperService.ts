import { getCustomRepository } from "typeorm";
import { DeveloperRepository } from "../business/repositories/DeveloperRepository";
import { Developer } from "../business/entities/Developer";
import { ErrorNotFound } from "../infra/http/errors/errorNotFound";

export class GetDeveloperService {
  async get(id: number): Promise<Developer> {
    const developerRepository = getCustomRepository(DeveloperRepository);

    const developer = await developerRepository.findOne(id);
    if (!developer) {
      throw new ErrorNotFound("Desenvolvedor não encontrado");
    }

    return developer;
  }
}
