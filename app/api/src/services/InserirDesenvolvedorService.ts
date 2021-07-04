import { DesenvolvedorRepository } from "../business/repositories/DesenvolvedorRepository";
import { getCustomRepository } from "typeorm";
import { validarDesenvolvedor } from "../business/customValidators/ValidarDesenvolvedor";
import { Desenvolvedor } from "../business/entities/Desenvolvedor";
import moment from "moment";
import { ErroBadRequest } from "../infra/http/errors/erroBadRequest";

export class InserirDesenvolvedorService {
  async inserir({ nome, dataNascimento, hobby, sexo }: Desenvolvedor) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedorJaExiste = await desenvolvedorRepository.findOne({
      nome: nome,
      dataNascimento: moment(dataNascimento, "YYYY-MM-DD", true).toDate(),
    });

    if (desenvolvedorJaExiste) {
      throw new ErroBadRequest("Desenvolvedor já cadastrado");
    }

    const desenvolvedorNovo = desenvolvedorRepository.create({
      nome: nome,
      dataNascimento: moment(dataNascimento, "YYYY-MM-DD", true).toDate(),
      hobby: hobby,
      sexo: sexo,
    });

    await validarDesenvolvedor(desenvolvedorNovo);

    await desenvolvedorRepository.save(desenvolvedorNovo);

    return desenvolvedorNovo;
  }
}
