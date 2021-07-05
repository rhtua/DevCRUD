import { DeveloperRepository } from "../business/repositories/DeveloperRepository";
import { getCustomRepository } from "typeorm";
import { developerValidator } from "../business/customValidators/DeveloperValidator";
import { GetDeveloperService } from "./GetDeveloperService";
import { Developer } from "../business/entities/Developer";
import moment from "moment";

export class EditDeveloperService {
  async editar({ id, nome, dataNascimento, hobby, sexo }: Developer) {
    const developerRepository = getCustomRepository(DeveloperRepository);

    let developer = await new GetDeveloperService().get(id);

    developer.nome = nome;
    developer.dataNascimento = moment(
      dataNascimento,
      "YYYY-MM-DD",
      true
    ).toDate();
    developer.hobby = hobby;
    developer.sexo = sexo;

    await developerValidator(developer);

    await developerRepository.save(developer);

    return developer;
  }
}
