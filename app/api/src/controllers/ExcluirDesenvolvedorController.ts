import { Request, Response } from "express";
import { ExcluirDesenvolvedorService } from "../services/ExcluirDesenvolvedorService";

export class ExcluirDesenvolvedorController {
  async excluir(request: Request, response: Response) {
    const excluirDevService = new ExcluirDesenvolvedorService();
    const dev = await excluirDevService.excluir(
      Number.parseInt(request.params.id)
    );
    response.status(204);
    return response.json(dev);
  }
}
