import { DesenvolvedorRepository } from "../business/repositories/DesenvolvedorRepository";
import { getCustomRepository } from "typeorm";
import { validarDesenvolvedor } from "../business/customValidators/ValidarDesenvolvedor";
import { ObterDesenvolvedorService } from "./ObterDesenvolvedorService";
import { Desenvolvedor } from "../business/entities/Desenvolvedor";
import moment from "moment";

export class EditarDesenvolvedorService {
  async editar({ id, nome, dataNascimento, hobby, sexo }: Desenvolvedor) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    let desenvolvedor = await new ObterDesenvolvedorService().obter(id);

    desenvolvedor.nome = nome;
    desenvolvedor.dataNascimento = moment(
      dataNascimento,
      "YYYY-MM-DD",
      true
    ).toDate();
    desenvolvedor.hobby = hobby;
    desenvolvedor.sexo = sexo;

    await validarDesenvolvedor(desenvolvedor);

    await desenvolvedorRepository.save(desenvolvedor);

    return desenvolvedor;
  }
}
