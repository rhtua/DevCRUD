import { Connection, createConnection } from "typeorm";
import { Developer } from "../../src/business/entities/Developer";
import { TestsSeed1625306997479 } from "../../src/infra/database/migrations/1625306997479-TestsSeed";

export async function emulatedDatabase(): Promise<Connection> {
  return await createConnection({
    type: "sqlite",
    database: ":memory:",
    entities: [Developer],
    logging: false,
    dropSchema: true,
    synchronize: true,
    migrations: [TestsSeed1625306997479],
    migrationsRun: true,
  });
}

export async function testsDatabase() {
  return await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT || ""),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TESTS_NAME,
    synchronize: true,
    logging: true,
    migrationsRun: true,
    entities: ["src/business/entities/*.ts"],
    migrations: ["src/infra/database/migrations/*.ts"],
    cli: {
      entitiesDir: "src/business/entities",
      migrationsDir: "src/infra/database/migrations",
    },
    dropSchema: true,
  });
}
