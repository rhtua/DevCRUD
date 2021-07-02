import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { getCustomRepository } from "typeorm";
import { validarDesenvolvedor } from "../customValidators/validarDesenvolvedor";
import { Desenvolvedor } from "../entities/desenvolvedor";
import moment from "moment";

export class InserirDesenvolvedorService {
  async inserir({ nome, dataNascimento, hobby, sexo }: Desenvolvedor) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    const desenvolvedorJaExiste = await desenvolvedorRepository.findOne({
      nome: nome,
      dataNascimento: moment(dataNascimento).toDate(),
    });

    if (desenvolvedorJaExiste) {
      throw new Error("Desenvolvedor já cadastrado");
    }

    const desenvolvedorNovo = desenvolvedorRepository.create({
      nome: nome,
      dataNascimento: moment(dataNascimento).toDate(),
      hobby: hobby,
      sexo: sexo,
    });

    await validarDesenvolvedor(desenvolvedorNovo);

    await desenvolvedorRepository.save(desenvolvedorNovo);

    return desenvolvedorNovo;
  }
}
