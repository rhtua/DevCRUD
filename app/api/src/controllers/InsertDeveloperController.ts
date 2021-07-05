import { Request, Response } from "express";
import { InsertDeveloperService } from "../services/InsertDeveloperService";
import { Developer } from "../business/entities/Developer";

export class InsertDeveloperController {
  async insert(request: Request, response: Response) {
    const { nome, dataNascimento, hobby, sexo } = request.body;
    const insertDeveloperService = new InsertDeveloperService();

    const dev = await insertDeveloperService.insert({
      nome,
      dataNascimento,
      hobby,
      sexo,
    } as Developer);

    return response.status(201).json(dev);
  }
}
