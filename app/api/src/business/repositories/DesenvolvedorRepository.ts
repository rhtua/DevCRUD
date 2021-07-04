import { EntityRepository, Repository } from "typeorm";
import { Desenvolvedor } from "../entities/Desenvolvedor";

@EntityRepository(Desenvolvedor)
class DesenvolvedorRepository extends Repository<Desenvolvedor> {
  async obterPaginado(
    pagina: number,
    limite: number,
    termo?: string,
    busca?: string
  ) {
    const query = this.createQueryBuilder("DESENVOLVEDORES");

    if (termo !== undefined && busca !== undefined) {
      query
        .where(`${termo} LIKE :query`, { query: `%${busca}%` })
        .orderBy(`${termo}`);
    }

    if (!Number.isNaN(pagina) && !Number.isNaN(limite)) {
      query.skip(limite * (pagina - 1)).take(limite);
    }

    const [desenvolvedores, registros] = await query.getManyAndCount();
    return { desenvolvedores, registros };
  }
}

export { DesenvolvedorRepository };
