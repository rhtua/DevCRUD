import { EntityRepository, Repository } from "typeorm";
import { Developer } from "../entities/Developer";

@EntityRepository(Developer)
class DeveloperRepository extends Repository<Developer> {
  async getPaginated(
    page: number,
    limit: number,
    field?: string,
    search?: string
  ) {
    const query = this.createQueryBuilder("DESENVOLVEDORES");

    if (field !== undefined && search !== undefined) {
      query
        .where(`${field} LIKE :query`, { query: `%${search}%` })
        .orderBy(`${field}`);
    }

    if (!Number.isNaN(page) && !Number.isNaN(limit)) {
      query.skip(limit * (page - 1)).take(limit);
    }

    const [developers, count] = await query.getManyAndCount();
    return { developers: developers, count: count };
  }
}

export { DeveloperRepository };
