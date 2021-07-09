import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { testsDatabase } from "../infra/connections";
import { Developer } from "../../src/business/entities/Developer";
import request from "supertest";
import { assert, expect } from "chai";

describe("Método GET /developers", () => {
  const TOTAL_RESULTS = 20;
  const COMMON_NAME = "Valdisney";
  const COMMON_RESULTS = 5;

  let connection: Connection;
  const server = new Server().api;

  before(async () => {
    connection = await testsDatabase();
  });

  it("Deve listar todos os desenvolvedores", (done) => {
    request(server)
      .get("/developers")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        expect(res.body).to.have.a.lengthOf(TOTAL_RESULTS);
        done();
      });
  });

  it("Deve paginar corretamente", (done) => {
    const resultsPerPage = 8;
    const totalPages = Math.ceil(TOTAL_RESULTS / resultsPerPage);
    const lastPageResultsCount =
      TOTAL_RESULTS - resultsPerPage * (totalPages - 1);

    request(server)
      .get("/developers")
      .query({ page: totalPages, limit: resultsPerPage })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        expect(res.body.developers).to.have.a.lengthOf(lastPageResultsCount);
        done();
      });
  });

  it("Deve filtrar os desenvolvedores de acordo com os parametros", (done) => {
    request(server)
      .get("/developers")
      .query({ field: "nome", value: COMMON_NAME })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        expect(res.body.developers).to.have.a.lengthOf(COMMON_RESULTS);
        done();
      });
  });

  it("Não deve retornar caso termo não seja válido", (done) => {
    const ERROR_FIELD_MESSAGE = "O termo deve conter uma propriedade válida";

    request(server)
      .get("/developers")
      .query({ field: "teste", value: COMMON_NAME })
      .expect("Content-Type", /json/)
      .expect(404)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, ERROR_FIELD_MESSAGE);
        done();
      });
  });

  it("Não deve retornar caso página ou limite não sejam válidos", (done) => {
    const ERROR_FIELD_MESSAGE =
      "Valores inseridos para página e/ou limite incorretos";

    request(server)
      .get("/developers")
      .query({ page: -1, limit: "P" })
      .expect("Content-Type", /json/)
      .expect(404)
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
