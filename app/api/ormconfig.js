module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ["src/business/entities/*.ts", "src/business/entities/*.js"],
  migrations: ["src/infra/database/migrations/*.ts"],
  cli: {
    entitiesDir: "src/business/entities",
    migrationsDir: "src/infra/database/migrations",
  },
};
