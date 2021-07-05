import { DeveloperRepository } from "../business/repositories/DeveloperRepository";
import { getCustomRepository } from "typeorm";
import { developerValidator } from "../business/customValidators/DeveloperValidator";
import { Developer } from "../business/entities/Developer";
import moment from "moment";
import { ErrorBadRequest } from "../infra/http/errors/errorBadRequest";

export class InsertDeveloperService {
  async insert({ nome, dataNascimento, hobby, sexo }: Developer) {
    const developerRepository = getCustomRepository(DeveloperRepository);

    const developerAlreadyExists = await developerRepository.findOne({
      nome: nome,
      dataNascimento: moment(dataNascimento, "YYYY-MM-DD", true).toDate(),
    });

    if (developerAlreadyExists) {
      throw new ErrorBadRequest("Desenvolvedor já cadastrado");
    }

    const newDeveloper = developerRepository.create({
      nome: nome,
      dataNascimento: moment(dataNascimento, "YYYY-MM-DD", true).toDate(),
      hobby: hobby,
      sexo: sexo,
    });

    await developerValidator(newDeveloper);

    await developerRepository.save(newDeveloper);

    return newDeveloper;
  }
}
