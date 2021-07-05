import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { testsDatabase } from "../infra/connections";
import { Developer } from "../../src/business/entities/Developer";
import request from "supertest";
import { assert } from "chai";
import moment from "moment/moment";

describe("Método PUT /developers", () => {
  const TOTAL_RESULTS = 20;
  let connection: Connection;
  const server = new Server().api;

  const TEST_DEVELOPER = {
    nome: "Teste Dev",
    hobby: "Ser objeto de teste",
    sexo: "O",
    dataNascimento: "1969-06-28",
    id: TOTAL_RESULTS + 1,
  };

  before(async () => {
    connection = await testsDatabase();
  });

  it("Deve inserir o desenvolvedor passado corretamente", (done) => {
    request(server)
      .post("/developers")
      .send({
        nome: TEST_DEVELOPER.nome,
        hobby: TEST_DEVELOPER.hobby,
        sexo: TEST_DEVELOPER.sexo,
        dataNascimento: TEST_DEVELOPER.dataNascimento,
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        let createdDev = res.body;
        createdDev.dataNascimento = moment(createdDev.dataNascimento).format(
          "YYYY-MM-DD"
        );
        assert.deepEqual(createdDev, TEST_DEVELOPER);
        done();
      });
  });

  it("Deve validar todos os campos e retornar erro para cada preenchido incorretamente", (done) => {
    const ERROR_FIELD_MESSAGE =
      "Os campos nome, sexo, hobby, dataNascimento estão preenchidos incorretamente!";

    request(server)
      .post("/developers")
      .send({
        nome: "",
        hobby: "",
        sexo: "...",
        dataNascimento: "2-2-2",
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, ERROR_FIELD_MESSAGE);
        done();
      });
  });

  after(async () => {
    await connection.getRepository(Developer).clear();
    await connection.close();
  });
});
