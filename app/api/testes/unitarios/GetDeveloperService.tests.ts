import { describe } from "mocha";
import { assert, expect } from "chai";
import { emulatedDatabase } from "../infra/connections";
import { Connection } from "typeorm";
import { GetDeveloperService } from "../../src/services/GetDeveloperService";

describe("ObterDesenvolvedorServiceTests", () => {
  let connection: Connection;
  let service: GetDeveloperService;
  const TOTAL_RESULTS = 20;
  const NOT_FOUND_ERROR = "Desenvolvedor não encontrado";

  before(async () => {
    connection = await emulatedDatabase();
    service = new GetDeveloperService();
  });

  it("Deve retornar o desenvolvedor desejado", async () => {
    const developer = await service.get(TOTAL_RESULTS);

    expect(developer).to.exist;
  });

  it("Deve retornar erro especifico caso não exista o desenvolvedor", async () => {
    let erroTermo = "";

    await service
      .get(TOTAL_RESULTS + 1)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, NOT_FOUND_ERROR);
  });

  after(() => {
    connection.close();
  });
});
