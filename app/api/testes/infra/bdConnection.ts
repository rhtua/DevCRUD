import { Connection, createConnection } from "typeorm";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import { TestesSeed1625306997479 } from "../../src/infra/database/migrations/1625306997479-TestesSeed";

export async function bdConnection(): Promise<Connection> {
  return await createConnection({
    type: "sqlite",
    database: ":memory:",
    entities: [Desenvolvedor],
    logging: true,
    dropSchema: true,
    synchronize: true,
    migrations: [TestesSeed1625306997479],
    migrationsRun: true,
  });
}
