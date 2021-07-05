import { Request, Response } from "express";
import { EditDeveloperService } from "../services/EditDeveloperService";
import { Developer } from "../business/entities/Developer";

export class EditDeveloperController {
  async edit(request: Request, response: Response) {
    const { nome, dataNascimento, hobby, sexo } = request.body;
    const id = Number.parseInt(request.params.id);

    const dev = await new EditDeveloperService().editar({
      id,
      nome,
      dataNascimento,
      hobby,
      sexo,
    } as Developer);
    return response.json(dev);
  }
}
