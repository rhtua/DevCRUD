import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { testsDatabase } from "../infra/connections";
import { Developer } from "../../src/business/entities/Developer";
import request from "supertest";
import { assert, expect } from "chai";

describe("Método DELETE /developers", () => {
  const TOTAL_RESULTS = 20;
  let connection: Connection;
  const server = new Server().api;

  before(async () => {
    connection = await testsDatabase();
  });

  it("Deve retornar erro caso ID seja inválido", (done) => {
    const DELETE_ERROR_MESSAGE = "Não foi possivel deletar";

    request(server)
      .delete(`/developers/${TOTAL_RESULTS + 1}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, DELETE_ERROR_MESSAGE);
        done();
      });
  });

  it("Deve retornar o desenvolvedor solicitado corretamente", async () => {
    await request(server).del(`/developers/${TOTAL_RESULTS}`).expect(204);

    const total = await connection.getRepository(Developer).count();

    expect(total).to.be.equal(TOTAL_RESULTS - 1);
  });

  after(async () => {
    await connection.getRepository(Developer).clear();
    await connection.close();
  });
});
