import { describe } from "mocha";
import { assert, expect } from "chai";
import { bdConnection } from "../infra/bdConnection";
import { Connection } from "typeorm";
import { EditarDesenvolvedorService } from "../../src/services/EditarDesenvolvedorService";
import { ObterDesenvolvedorService } from "../../src/services/ObterDesenvolvedorService";
import moment from "moment";

describe("EditarDesenvolvedorServiceTests", () => {
  let conexao: Connection;
  let obterService: ObterDesenvolvedorService;
  let editarService: EditarDesenvolvedorService;
  const REGISTROS_TOTAIS = 20;
  const ERRO_TODOS_CAMPOS =
    "Os campos nome, sexo, hobby, dataNascimento estão preenchidos incorretamente!";

  before(async () => {
    conexao = await bdConnection();
    editarService = new EditarDesenvolvedorService();
    obterService = new ObterDesenvolvedorService();
  });

  it("Deve editar o desenvolvedor desejado corretamente", async () => {
    const novoNome = "Nome Teste";
    const novoHobby = "Testar a api";

    const desenvolvedor = await obterService.obter(REGISTROS_TOTAIS);

    let desenvolvedorEditado = desenvolvedor;
    desenvolvedorEditado.nome = novoNome;
    desenvolvedorEditado.hobby = novoHobby;

    desenvolvedorEditado = await editarService.editar(desenvolvedorEditado);

    expect(desenvolvedorEditado.nome).to.be.equal(novoNome);
    expect(desenvolvedorEditado.hobby).to.be.equal(novoHobby);
    expect(desenvolvedorEditado.dataNascimento).to.be.equal(
      desenvolvedor.dataNascimento
    );
    expect(desenvolvedorEditado.sexo).to.be.equal(desenvolvedor.sexo);
  });

  it("Deve retornar erro especifico caso o valor editado seja preenchido incorretamente", async () => {
    const nomeInvalido = "";
    const hobbyInvalido = "";
    const dataNascimentoInvalida = moment("200-13-25").toDate();
    const sexoInvallido = "K";

    let erroTermo = "";

    let desenvolvedorEditado = await obterService.obter(REGISTROS_TOTAIS);
    desenvolvedorEditado.nome = nomeInvalido;
    desenvolvedorEditado.hobby = hobbyInvalido;
    desenvolvedorEditado.dataNascimento = dataNascimentoInvalida;
    desenvolvedorEditado.sexo = sexoInvallido;

    await editarService
      .editar(desenvolvedorEditado)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ERRO_TODOS_CAMPOS);
  });

  after(() => {
    conexao.close();
  });
});
