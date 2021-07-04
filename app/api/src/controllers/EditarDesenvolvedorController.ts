import { Request, Response } from "express";
import { EditarDesenvolvedorService } from "../services/EditarDesenvolvedorService";
import { Desenvolvedor } from "../business/entities/Desenvolvedor";

export class EditarDesenvolvedorController {
  async editar(request: Request, response: Response) {
    const { nome, dataNascimento, hobby, sexo } = request.body;
    const id = Number.parseInt(request.params.id);
    const editarDevService = new EditarDesenvolvedorService();

    const dev = await editarDevService.editar({
      id,
      nome,
      dataNascimento,
      hobby,
      sexo,
    } as Desenvolvedor);
    return response.json(dev);
  }
}
