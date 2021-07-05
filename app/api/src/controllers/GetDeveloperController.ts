import { Request, Response } from "express";
import { GetDeveloperService } from "../services/GetDeveloperService";

export class GetDeveloperController {
  async getOne(request: Request, response: Response) {
    const getDeveloperService = new GetDeveloperService();
    const dev = await getDeveloperService.get(
      Number.parseInt(request.params.id)
    );

    return response.json(dev);
  }
}
