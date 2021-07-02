import { Request, Response } from "express";
import { ObterDesenvolvedorService } from "../services/ObterDesenvolvedorService";

export class ObterDesenvolvedorController {
  async obterUm(request: Request, response: Response) {
    const obterDevService = new ObterDesenvolvedorService();
    const dev = await obterDevService.obter(Number.parseInt(request.params.id));

    return response.json(dev);
  }
}
