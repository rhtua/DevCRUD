import { describe } from "mocha";
import { assert, expect } from "chai";
import { bancoEmMemoria } from "../infra/conexoes";
import { Connection } from "typeorm";
import * as faker from "faker";
import { InserirDesenvolvedorService } from "../../src/services/InserirDesenvolvedorService";
import moment from "moment";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";

describe("InserirDesenvolvedorServiceTests", () => {
  let conexao: Connection;
  let service: InserirDesenvolvedorService;
  const REGISTROS_TOTAIS = 20;
  const ERRO_TODOS_CAMPOS =
    "Os campos nome, sexo, hobby, dataNascimento estão preenchidos incorretamente!";
  const ERRO_JA_EXISTE = "Desenvolvedor já cadastrado";

  before(async () => {
    conexao = await bancoEmMemoria();
    service = new InserirDesenvolvedorService();
  });

  it("Deve inserir um desenvolvedor corretamente", async () => {
    const NOME = faker.name.firstName() + faker.name.lastName();
    const HOBBY = faker.company.bs();
    const DATANASCIMENTO = faker.date.past();
    const SEXO = "M";

    let desenvolvedor = new Desenvolvedor();
    desenvolvedor.nome = NOME;
    desenvolvedor.hobby = HOBBY;
    desenvolvedor.dataNascimento = DATANASCIMENTO;
    desenvolvedor.sexo = SEXO;

    const desenvolvedorNovo = await service.inserir(desenvolvedor);

    expect(desenvolvedorNovo.nome).to.be.equal(NOME);
    expect(desenvolvedorNovo.hobby).to.be.equal(HOBBY);
    assert.deepEqual(desenvolvedorNovo.dataNascimento, DATANASCIMENTO);
    expect(desenvolvedorNovo.sexo).to.be.equal(SEXO);
    expect(desenvolvedorNovo.id).to.be.equal(REGISTROS_TOTAIS + 1);
  });

  it("Deve retornar erro especifico caso um valor seja preenchido incorretamente", async () => {
    const nomeInvalido = "";
    const hobbyInvalido = "";
    const dataNascimentoInvalida = moment("200-13-25").toDate();
    const sexoInvallido = "K";
    let erroTermo = "";

    let desenvolvedor = new Desenvolvedor();
    desenvolvedor.nome = nomeInvalido;
    desenvolvedor.hobby = hobbyInvalido;
    desenvolvedor.dataNascimento = dataNascimentoInvalida;
    desenvolvedor.sexo = sexoInvallido;

    await service
      .inserir(desenvolvedor)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ERRO_TODOS_CAMPOS);
  });

  after(() => {
    conexao.close();
  });
});
