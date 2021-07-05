import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { testsDatabase } from "../infra/connections";
import { Developer } from "../../src/business/entities/Developer";
import request from "supertest";
import { assert } from "chai";
import moment from "moment/moment";

describe("Método PUT /developers/ID", () => {
  const TOTAL_RESULTS = 20;
  let connection: Connection;
  const server = new Server().api;
  const NEW_VALID_NAME = "Novo Nome Para Teste";
  const NEW_INVALID_NAME = "";
  const RANDOM_HANDLE = Math.round(Math.random() * (20 - 1) + 1);
  let randomDeveloper: Developer;

  before(async () => {
    connection = await testsDatabase();
    randomDeveloper = (await connection
      .getRepository(Developer)
      .findOne(RANDOM_HANDLE)) as Developer;
  });

  it("Deve editar o desenvolvedor desejado corretamente", (done) => {
    let devToEdit = randomDeveloper;
    devToEdit.nome = NEW_VALID_NAME;

    request(server)
      .put(`/developers/${RANDOM_HANDLE}`)
      .send({
        nome: devToEdit.nome,
        hobby: devToEdit.hobby,
        sexo: devToEdit.sexo,
        dataNascimento: moment(devToEdit.dataNascimento).format("YYYY-MM-DD"),
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.nome, NEW_VALID_NAME);
        assert.equal(res.body.id, RANDOM_HANDLE);
        done();
      });
  });

  it("Deve validar todos os campos e retornar erro para cada preenchido incorretamente", (done) => {
    const NAME_ERROR_MESSAGE = "O campo nome está preenchido incorretamente!";

    request(server)
      .put(`/developers/${RANDOM_HANDLE}`)
      .send({
        nome: NEW_INVALID_NAME,
        hobby: randomDeveloper.hobby,
        sexo: randomDeveloper.sexo,
        dataNascimento: moment(randomDeveloper.dataNascimento).format(
          "YYYY-MM-DD"
        ),
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, NAME_ERROR_MESSAGE);
        done();
      });
  });

  after(async () => {
    await connection.getRepository(Developer).clear();
    await connection.close();
  });
});
