import { getCustomRepository } from "typeorm";
import { DeveloperRepository } from "../business/repositories/DeveloperRepository";
import { Developer } from "../business/entities/Developer";

export class GetDevelopersService {
  async getAll(): Promise<Developer[]> {
    const developerRepository = getCustomRepository(DeveloperRepository);

    return await developerRepository.find();
  }
}
