import { describe } from "mocha";
import { assert, expect } from "chai";
import { emulatedDatabase } from "../infra/connections";
import { Connection } from "typeorm";
import { GetDevelopersService } from "../../src/services/GetDevelopersService";
import { Developer } from "../../src/business/entities/Developer";

describe("ObterDesenvolvedoresServiceTests", () => {
  let connection: Connection;
  let service: GetDevelopersService;
  const TOTAL_RESULTS = 20;

  before(async () => {
    connection = await emulatedDatabase();
    service = new GetDevelopersService();
  });

  it("Deve retornar todos os desenvolvedores existentes", async () => {
    const developers = await service.getAll();

    assert.equal(developers.length, TOTAL_RESULTS);
  });

  it("Deve retornar array vazio caso não exista desenvolvedores", async () => {
    let erroTermo = "";

    await connection.getRepository(Developer).clear();

    const developers = await service.getAll();

    expect(developers).to.be.empty;
  });

  after(() => {
    connection.close();
  });
});
