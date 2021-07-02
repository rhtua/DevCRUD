import { Request, Response } from "express";
import { InserirDesenvolvedorService } from "../services/InserirDesenvolvedorService";
import { Desenvolvedor } from "../entities/desenvolvedor";

export class InserirDesenvolvedorController {
  async inserir(request: Request, response: Response) {
    const { nome, dataNascimento, hobby, sexo } = request.body;
    const inserirDevService = new InserirDesenvolvedorService();

    const dev = await inserirDevService.inserir({
      nome,
      dataNascimento,
      hobby,
      sexo,
    } as Desenvolvedor);
    return response.json(dev);
  }
}
