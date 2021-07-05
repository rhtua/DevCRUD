import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { bancoDeTestes } from "../infra/conexoes";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import request from "supertest";
import { assert, expect } from "chai";
import { getRepository } from "typeorm";
import moment from "moment/moment";

describe("Método DELETE /developers", () => {
  const REGISTROS_TOTAIS = 20;
  let conexao: Connection;
  const server = new Server().api;

  before(async () => {
    conexao = await bancoDeTestes();
  });

  it("Deve retornar erro caso ID seja inválido", (done) => {
    const MENSAGEM_ERRO_AO_DELETAR = "Não foi possivel deletar";

    request(server)
      .delete(`/developers/${REGISTROS_TOTAIS + 1}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, MENSAGEM_ERRO_AO_DELETAR);
        done();
      });
  });

  it("Deve retornar o desenvolvedor solicitado corretamente", async () => {
    await request(server).del(`/developers/${REGISTROS_TOTAIS}`).expect(204);

    const total = await conexao.getRepository(Desenvolvedor).count();

    expect(total).to.be.equal(REGISTROS_TOTAIS - 1);
  });

  after(async () => {
    await conexao.getRepository(Desenvolvedor).clear();
    await conexao.close();
  });
});
