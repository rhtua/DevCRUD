import { DeveloperRepository } from "../business/repositories/DeveloperRepository";
import { getCustomRepository } from "typeorm";
import { GetDeveloperService } from "./GetDeveloperService";
import { ErrorBadRequest } from "../infra/http/errors/errorBadRequest";

export class DeleteDeveloperService {
  async delete(id: number) {
    const developerRepository = getCustomRepository(DeveloperRepository);

    try {
      const developer = await new GetDeveloperService().get(id);
      return await developerRepository.remove(developer);
    } catch (err) {
      throw new ErrorBadRequest("Não foi possivel deletar");
    }
  }
}
