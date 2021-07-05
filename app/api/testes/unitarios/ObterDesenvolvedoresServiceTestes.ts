import { describe } from "mocha";
import { assert, expect } from "chai";
import { bancoEmMemoria } from "../infra/conexoes";
import { Connection } from "typeorm";
import { ObterDesenvolvedoresService } from "../../src/services/ObterDesenvolvedoresService";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";

describe("ObterDesenvolvedoresServiceTests", () => {
  let conexao: Connection;
  let service: ObterDesenvolvedoresService;
  const REGISTROS_TOTAIS = 20;

  before(async () => {
    conexao = await bancoEmMemoria();
    service = new ObterDesenvolvedoresService();
  });

  it("Deve retornar todos os desenvolvedores existentes", async () => {
    const desenvolvedores = await service.obterTodos();

    assert.equal(desenvolvedores.length, REGISTROS_TOTAIS);
  });

  it("Deve retornar array vazio caso não exista desenvolvedores", async () => {
    let erroTermo = "";

    await conexao.getRepository(Desenvolvedor).clear();

    const desenvolvedores = await service.obterTodos();

    expect(desenvolvedores).to.be.empty;
  });

  after(() => {
    conexao.close();
  });
});
