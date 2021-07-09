import { Request, Response } from "express";
import { GetDevelopersService } from "../services/GetDevelopersService";
import { GetDevelopersByQueryStringPaginated } from "../services/GetDevelopersByQueryStringPaginated";

export class GetDevelopersController {
  async getAll(request: Request, response: Response) {
    if (Object.keys(request.query).length > 0) {
      const getDevelopersByQueryStringPaginated =
        new GetDevelopersByQueryStringPaginated();
      const params = request.query;
      const dev = await getDevelopersByQueryStringPaginated.search(
        params.page as string,
        params.limit as string,
        params.field as string,
        params.value as string
      );

      return response.json(dev);
    } else {
      return response.json(await new GetDevelopersService().getAll());
    }
  }
}
