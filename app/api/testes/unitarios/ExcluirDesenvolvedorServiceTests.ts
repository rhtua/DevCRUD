import { describe } from "mocha";
import { assert, expect } from "chai";
import { bancoEmMemoria } from "../infra/conexoes";
import { Connection } from "typeorm";
import { ExcluirDesenvolvedorService } from "../../src/services/ExcluirDesenvolvedorService";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";

describe("ExcluirDesenvolvedorServiceTests", () => {
  let conexao: Connection;
  let service: ExcluirDesenvolvedorService;
  const REGISTROS_TOTAIS = 20;
  const ERRO_NAO_ENCONTRADO = "Não foi possivel deletar";

  before(async () => {
    conexao = await bancoEmMemoria();
    service = new ExcluirDesenvolvedorService();
  });

  it("Deve excluir o desenvolvedor desejado", async () => {
    await service.excluir(REGISTROS_TOTAIS);

    expect(await conexao.getRepository(Desenvolvedor).count()).to.be.equal(
      REGISTROS_TOTAIS - 1
    );
  });

  it("Deve retornar erro especifico caso não exista o desenvolvedor", async () => {
    let erroTermo = "";

    await service
      .excluir(REGISTROS_TOTAIS + 1)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ERRO_NAO_ENCONTRADO);
  });

  after(() => {
    conexao.close();
  });
});
