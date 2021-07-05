import { getCustomRepository } from "typeorm";
import { DeveloperRepository } from "../business/repositories/DeveloperRepository";
import { ErrorNotFound } from "../infra/http/errors/errorNotFound";
import { queryParametersValidator } from "../business/customValidators/QueryParametersValidator";

export class GetDevelopersByQueryStringPaginated {
  async search(page?: string, limit?: string, field?: string, search?: string) {
    const developerRepository = getCustomRepository(DeveloperRepository);

    queryParametersValidator(page, limit, field, search);

    const developers = await developerRepository.getPaginated(
      Number.parseInt(page || ""),
      Number.parseInt(limit || ""),
      field,
      search
    );

    if (developers.count == 0) {
      throw new ErrorNotFound("Nenhum desenvolvedor encontrado");
    }

    return developers;
  }
}
