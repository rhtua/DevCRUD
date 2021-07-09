module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrationsRun: true,
  synchronize: true,
  logging: true,
  entities: ["src/business/entities/*.ts"],
  migrations: ["src/infra/database/migrations/*.ts"],
  cli: {
    entitiesDir: "src/business/entities",
    migrationsDir: "src/infra/database/migrations",
  },
};
