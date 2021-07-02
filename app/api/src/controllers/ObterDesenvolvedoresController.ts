import { Request, Response } from "express";
import { ObterDesenvolvedoresService } from "../services/ObterDesenvolvedoresService";
import { ObterDesenvolvedoresPorQueryEPaginacaoService } from "../services/ObterDesenvolvedoresPorQueryEPaginacaoService";

export class ObterDesenvolvedoresController {
  async obterTodos(request: Request, response: Response) {
    if (Object.keys(request.query).length > 0) {
      const obterDevQueryService =
        new ObterDesenvolvedoresPorQueryEPaginacaoService();
      const params = request.query;
      const dev = await obterDevQueryService.buscar(
        params.pagina as string,
        params.limite as string,
        params.termo as string,
        params.busca as string
      );

      return response.json(dev);
    } else {
      const obterDevService = new ObterDesenvolvedoresService();
      return response.json(await obterDevService.obterTodos());
    }
  }
}
