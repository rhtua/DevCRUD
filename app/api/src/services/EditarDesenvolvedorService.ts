import { DesenvolvedorRepository } from "../repositories/DesenvolvedorRepository";
import { getCustomRepository } from "typeorm";
import { validarDesenvolvedor } from "../customValidators/validarDesenvolvedor";
import { ObterDesenvolvedorService } from "./ObterDesenvolvedorService";
import { Desenvolvedor } from "../entities/desenvolvedor";

export class EditarDesenvolvedorService {
  async editar({ id, nome, dataNascimento, hobby, sexo }: Desenvolvedor) {
    const desenvolvedorRepository = getCustomRepository(
      DesenvolvedorRepository
    );

    let desenvolvedor = await new ObterDesenvolvedorService().obter(id);

    desenvolvedor.nome = nome;
    desenvolvedor.dataNascimento = dataNascimento;
    desenvolvedor.hobby = hobby;
    desenvolvedor.sexo = sexo;

    await validarDesenvolvedor(desenvolvedor);

    await desenvolvedorRepository.save(desenvolvedor);

    return desenvolvedor;
  }
}
