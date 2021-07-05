import { describe } from "mocha";
import { assert, expect } from "chai";
import { emulatedDatabase } from "../infra/connections";
import { Connection } from "typeorm";
import { EditDeveloperService } from "../../src/services/EditDeveloperService";
import { GetDeveloperService } from "../../src/services/GetDeveloperService";
import moment from "moment";

describe("EditarDesenvolvedorServiceTests", () => {
  let connection: Connection;
  let getDeveloperService: GetDeveloperService;
  let editDeveloperService: EditDeveloperService;
  const TOTAL_RESULTS = 20;
  const ALL_FIELDS_ERROR_MESSAGE =
    "Os campos nome, sexo, hobby, dataNascimento estão preenchidos incorretamente!";

  before(async () => {
    connection = await emulatedDatabase();
    editDeveloperService = new EditDeveloperService();
    getDeveloperService = new GetDeveloperService();
  });

  it("Deve editar o desenvolvedor desejado corretamente", async () => {
    const newName = "Nome Teste";
    const newHobby = "Testar a api";

    const developer = await getDeveloperService.get(TOTAL_RESULTS);

    let editedDeveloper = developer;
    editedDeveloper.nome = newName;
    editedDeveloper.hobby = newHobby;

    editedDeveloper = await editDeveloperService.editar(editedDeveloper);

    expect(editedDeveloper.nome).to.be.equal(newName);
    expect(editedDeveloper.hobby).to.be.equal(newHobby);
    assert.deepEqual(editedDeveloper.dataNascimento, developer.dataNascimento);
    expect(editedDeveloper.sexo).to.be.equal(developer.sexo);
  });

  it("Deve retornar erro especifico caso o valor editado seja preenchido incorretamente", async () => {
    const nomeInvalido = "";
    const hobbyInvalido = "";
    const dataNascimentoInvalida = moment("200-13-25").toDate();
    const sexoInvalido = "K";

    let erroTermo = "";

    let editedDeveloper = await getDeveloperService.get(TOTAL_RESULTS);
    editedDeveloper.nome = nomeInvalido;
    editedDeveloper.hobby = hobbyInvalido;
    editedDeveloper.dataNascimento = dataNascimentoInvalida;
    editedDeveloper.sexo = sexoInvalido;

    await editDeveloperService
      .editar(editedDeveloper)
      .catch((err) => (erroTermo = err.message));

    assert.equal(erroTermo, ALL_FIELDS_ERROR_MESSAGE);
  });

  after(() => {
    connection.close();
  });
});
