import { describe } from "mocha";
import { assert, expect } from "chai";
import { bdConnection } from "../infra/bdConnection";
import { Connection } from "typeorm";
import { ObterDesenvolvedorService } from "../../src/services/ObterDesenvolvedorService";

describe("ObterDesenvolvedorServiceTests", () => {
  let conexao: Connection;
  let service: ObterDesenvolvedorService;
  const REGISTROS_TOTAIS = 20;
  const ERRO_NAO_ENCONTRADO = "Desenvolvedor não encontrado";

  before(async () => {
    conexao = await bdConnection();
    service = new ObterDesenvolvedorService();
  });

  it("Deve retornar o desenvolvedor desejado", async () => {
    const desenvolvedor = await service.obter(REGISTROS_TOTAIS);

    expect(desenvolvedor).to.exist;
  });

  it("Deve retornar erro especifico caso não exista o desenvolvedor", async () => {
    let erroTermo = "";

    await service
      .obter(REGISTROS_TOTAIS + 1)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ERRO_NAO_ENCONTRADO);
  });

  after(() => {
    conexao.close();
  });
});
