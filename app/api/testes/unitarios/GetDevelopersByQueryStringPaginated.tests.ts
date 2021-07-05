import { describe } from "mocha";
import { assert } from "chai";
import { emulatedDatabase } from "../infra/connections";
import { GetDevelopersByQueryStringPaginated } from "../../src/services/GetDevelopersByQueryStringPaginated";
import { Connection } from "typeorm";

describe("ObterDesenvolvedoresPorQueryEPaginacaoServiceTestes", () => {
  let connection: Connection;
  let service: GetDevelopersByQueryStringPaginated;
  const COMMON_RESULTS = 5;
  const TOTAL_RESULTS = 20;
  const PAGE_AND_LIMIT_ERROR_MESSAGE =
    "Valores inseridos para página e/ou limite incorretos";
  const FIELD_ERROR_MESSAGE = "O termo deve conter uma propriedade válida";

  before(async () => {
    connection = await emulatedDatabase();
    service = new GetDevelopersByQueryStringPaginated();
  });

  it("Deve respeitar o limite de paginação", async () => {
    const limit = 12;
    const developers = await service.search("1", limit.toString());

    assert.equal(developers.developers.length, limit);
  });

  it("Deve paginar corretamente", async () => {
    const limit = 12;
    const lastPage = Math.ceil(TOTAL_RESULTS / limit);
    const developers = await service.search(
      lastPage.toString(),
      limit.toString()
    );

    assert.equal(
      developers.developers.length,
      TOTAL_RESULTS - limit * Math.floor(TOTAL_RESULTS / limit)
    );
  });

  it("Deve retornar desenvolvedores com o hobby Criar apis em node", async () => {
    const hobby = "Criar apis em node";

    const desenvolvedores = await service.search(
      undefined,
      undefined,
      "hobby",
      hobby
    );

    assert.equal(desenvolvedores.count, COMMON_RESULTS);
  });

  it("Deve retornar desenvolvedores com o nome Jose", async () => {
    const nome = "Valdisney";

    const developers = await service.search(undefined, undefined, "nome", nome);

    assert.equal(developers.count, COMMON_RESULTS);
  });

  it("Deve retornar desenvolvedores com a data de nascimento 13/03/2000", async () => {
    const dataNascimento = "2000-03-13";

    const developers = await service.search(
      undefined,
      undefined,
      "dataNascimento",
      dataNascimento
    );

    assert.equal(developers.count, COMMON_RESULTS);
  });

  it("Deve retornar desenvolvedores com o sexo O", async () => {
    const sexo = "O";

    const developers = await service.search(undefined, undefined, "sexo", sexo);

    assert.equal(developers.count, COMMON_RESULTS);
  });

  it("Deve retornar todos os desenvolvedores caso não preenchido", async () => {
    const developers = await service.search(
      undefined,
      undefined,
      undefined,
      undefined
    );

    assert.equal(developers.count, TOTAL_RESULTS);
  });

  it("Não deve retornar desenvolvedores caso página ou limite preenchido incorretamente", async () => {
    let message = "";

    await service.search("C", "$").catch((err) => (message = err.message));

    assert.equal(message, PAGE_AND_LIMIT_ERROR_MESSAGE);
  });

  it("Não deve retornar desenvolvedores caso a propriedade inserida em termo não exista", async () => {
    let erroTermo = "";

    await service
      .search(undefined, undefined, "colunaInvalida", undefined)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, FIELD_ERROR_MESSAGE);
  });

  after(() => {
    connection.close();
  });
});
