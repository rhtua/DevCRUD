import { describe } from "mocha";
import { assert, expect } from "chai";
import { emulatedDatabase } from "../infra/connections";
import { Connection } from "typeorm";
import * as faker from "faker";
import { InsertDeveloperService } from "../../src/services/InsertDeveloperService";
import moment from "moment";
import { Developer } from "../../src/business/entities/Developer";

describe("InserirDesenvolvedorServiceTests", () => {
  let connection: Connection;
  let service: InsertDeveloperService;
  const TOTAL_RESULTS = 20;
  const ALL_FIELDS_ERROR_MESSAGE =
    "Os campos nome, sexo, hobby, dataNascimento estão preenchidos incorretamente!";
  const ALREADY_EXISTS_ERROR_MESSAGE = "Desenvolvedor já cadastrado";

  before(async () => {
    connection = await emulatedDatabase();
    service = new InsertDeveloperService();
  });

  it("Deve inserir um desenvolvedor corretamente", async () => {
    const nome = faker.name.firstName() + faker.name.lastName();
    const hobby = faker.company.bs();
    const dataNascimento = faker.date.past();
    const sexo = "M";

    let developer = new Developer();
    developer.nome = nome;
    developer.hobby = hobby;
    developer.dataNascimento = dataNascimento;
    developer.sexo = sexo;

    const newDeveloper = await service.insert(developer);

    expect(newDeveloper.nome).to.be.equal(nome);
    expect(newDeveloper.hobby).to.be.equal(hobby);
    assert.deepEqual(newDeveloper.dataNascimento, dataNascimento);
    expect(newDeveloper.sexo).to.be.equal(sexo);
    expect(newDeveloper.id).to.be.equal(TOTAL_RESULTS + 1);
  });

  it("Deve retornar erro especifico caso um valor seja preenchido incorretamente", async () => {
    const nomeInvalido = "";
    const hobbyInvalido = "";
    const dataNascimentoInvalida = moment("200-13-25").toDate();
    const sexoInvallido = "K";
    let erroTermo = "";

    let developer = new Developer();
    developer.nome = nomeInvalido;
    developer.hobby = hobbyInvalido;
    developer.dataNascimento = dataNascimentoInvalida;
    developer.sexo = sexoInvallido;

    await service.insert(developer).catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ALL_FIELDS_ERROR_MESSAGE);
  });

  after(() => {
    connection.close();
  });
});
