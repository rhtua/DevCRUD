import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { bancoDeTestes } from "../infra/conexoes";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import request from "supertest";
import { assert, expect } from "chai";

describe("Método GET /developers/ID", () => {
  const REGISTROS_TOTAIS = 20;
  let conexao: Connection;
  const server = new Server().api;

  before(async () => {
    conexao = await bancoDeTestes();
  });

  it("Deve retornar o desenvolvedor solicitado corretamente", (done) => {
    const PRIMEIRO_REGISTRO = 1;

    request(server)
      .get(`/developers/${PRIMEIRO_REGISTRO}`)
      .expect("Content-Type", /json/)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.id, PRIMEIRO_REGISTRO);
        done();
      });
  });

  it("Deve retornar não encontrado caso ID seja inválido", (done) => {
    const MENSAGEM_NAO_ENCONTRADO = "Desenvolvedor não encontrado";

    request(server)
      .get(`/developers/${REGISTROS_TOTAIS + 1}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, MENSAGEM_NAO_ENCONTRADO);
        done();
      });
  });

  after(async () => {
    await conexao.getRepository(Desenvolvedor).clear();
    await conexao.close();
  });
});
