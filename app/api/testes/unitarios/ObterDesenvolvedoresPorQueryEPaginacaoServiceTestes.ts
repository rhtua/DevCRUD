import { describe } from "mocha";
import { assert } from "chai";
import { bdConnection } from "../infra/bdConnection";
import { ObterDesenvolvedoresPorQueryEPaginacaoService } from "../../src/services/ObterDesenvolvedoresPorQueryEPaginacaoService";
import { Connection } from "typeorm";

describe("ObterDesenvolvedoresPorQueryEPaginacaoServiceTestes", () => {
  let conexao: Connection;
  let service: ObterDesenvolvedoresPorQueryEPaginacaoService;
  const REGISTROS_COMUNS = 5;
  const REGISTROS_TOTAIS = 20;
  const ERRO_PAGINA_E_LIMITE =
    "Valores inseridos para página e/ou limite incorretos";
  const ERRO_TERMO = "O termo deve conter uma propriedade válida";

  before(async () => {
    conexao = await bdConnection();
    service = new ObterDesenvolvedoresPorQueryEPaginacaoService();
  });

  it("Deve respeitar o limite de paginação", async () => {
    const limite = 12;
    const desenvolvedores = await service.buscar("1", limite.toString());

    assert.equal(desenvolvedores.desenvolvedores.length, limite);
  });

  it("Deve paginar corretamente", async () => {
    const limite = 12;
    const ultimaPagina = Math.ceil(REGISTROS_TOTAIS / limite);
    const desenvolvedores = await service.buscar(
      ultimaPagina.toString(),
      limite.toString()
    );

    assert.equal(
      desenvolvedores.desenvolvedores.length,
      REGISTROS_TOTAIS - limite * Math.floor(REGISTROS_TOTAIS / limite)
    );
  });

  it("Deve retornar desenvolvedores com o hobby Criar apis em node", async () => {
    const hobby = "Criar apis em node";

    const desenvolvedores = await service.buscar(
      undefined,
      undefined,
      "hobby",
      hobby
    );

    assert.equal(desenvolvedores.registros, REGISTROS_COMUNS);
  });

  it("Deve retornar desenvolvedores com o nome Jose", async () => {
    const nome = "Jose";

    const desenvolvedores = await service.buscar(
      undefined,
      undefined,
      "nome",
      nome
    );

    assert.equal(desenvolvedores.registros, REGISTROS_COMUNS);
  });

  it("Deve retornar desenvolvedores com a data de nascimento 13/03/2000", async () => {
    const dataNascimento = "2000-03-13";

    const desenvolvedores = await service.buscar(
      undefined,
      undefined,
      "dataNascimento",
      dataNascimento
    );

    assert.equal(desenvolvedores.registros, REGISTROS_COMUNS);
  });

  it("Deve retornar desenvolvedores com o sexo O", async () => {
    const sexo = "O";

    const desenvolvedores = await service.buscar(
      undefined,
      undefined,
      "sexo",
      sexo
    );

    assert.equal(desenvolvedores.registros, REGISTROS_COMUNS);
  });

  it("Deve retornar todos os desenvolvedores caso não preenchido", async () => {
    const desenvolvedores = await service.buscar(
      undefined,
      undefined,
      undefined,
      undefined
    );

    assert.equal(desenvolvedores.registros, REGISTROS_TOTAIS);
  });

  it("Não deve retornar desenvolvedores caso página ou limite preenchido incorretamente", async () => {
    let mensagem = "";

    await service.buscar("C", "$").catch((err) => (mensagem = err.message));

    assert.equal(mensagem, ERRO_PAGINA_E_LIMITE);
  });

  it("Não deve retornar desenvolvedores caso a propriedade inserida em termo não exista", async () => {
    let erroTermo = "";

    await service
      .buscar(undefined, undefined, "colunaInvalida", undefined)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ERRO_TERMO);
  });

  after(() => {
    conexao.close();
  });
});
