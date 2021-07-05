import { describe } from "mocha";
import { assert, expect } from "chai";
import { emulatedDatabase } from "../infra/connections";
import { Connection } from "typeorm";
import { DeleteDeveloperService } from "../../src/services/DeleteDeveloperService";
import { Developer } from "../../src/business/entities/Developer";

describe("ExcluirDesenvolvedorServiceTests", () => {
  let connection: Connection;
  let service: DeleteDeveloperService;
  const TOTAL_RESULTS = 20;
  const NOT_FOUND_ERROR_MESSAGE = "Não foi possivel deletar";

  before(async () => {
    connection = await emulatedDatabase();
    service = new DeleteDeveloperService();
  });

  it("Deve excluir o desenvolvedor desejado", async () => {
    await service.delete(TOTAL_RESULTS);

    expect(await connection.getRepository(Developer).count()).to.be.equal(
      TOTAL_RESULTS - 1
    );
  });

  it("Deve retornar erro especifico caso não exista o desenvolvedor", async () => {
    let erroTermo = "";

    await service
      .delete(TOTAL_RESULTS + 1)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, NOT_FOUND_ERROR_MESSAGE);
  });

  after(() => {
    connection.close();
  });
});
