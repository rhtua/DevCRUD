import { Request, Response } from "express";
import { DeleteDeveloperService } from "../services/DeleteDeveloperService";

export class DeleteDeveloperController {
  async delete(request: Request, response: Response) {
    const deleteDeveloperService = new DeleteDeveloperService();
    const dev = await deleteDeveloperService.delete(
      Number.parseInt(request.params.id)
    );

    return response.status(204).json(dev);
  }
}
