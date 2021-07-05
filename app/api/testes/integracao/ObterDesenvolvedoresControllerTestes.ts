import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { bancoDeTestes } from "../infra/conexoes";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import request from "supertest";
import { assert, expect } from "chai";

describe("Método GET /developers", () => {
  const REGISTROS_TOTAIS = 20;
  const NOME_COMUM = "Valdisney";
  const REGISTROS_COMUNS = 5;

  let conexao: Connection;
  const server = new Server().api;

  before(async () => {
    conexao = await bancoDeTestes();
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

        expect(res.body).to.have.a.lengthOf(REGISTROS_TOTAIS);
        done();
      });
  });

  it("Deve paginar corretamente", (done) => {
    const registrosPorPagina = 8;
    const totalPaginas = Math.ceil(REGISTROS_TOTAIS / registrosPorPagina);
    const registrosNaUltimaPagina =
      REGISTROS_TOTAIS - registrosPorPagina * (totalPaginas - 1);

    request(server)
      .get("/developers")
      .query({ pagina: totalPaginas, limite: registrosPorPagina })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        expect(res.body.desenvolvedores).to.have.a.lengthOf(
          registrosNaUltimaPagina
        );
        done();
      });
  });

  it("Deve filtrar os desenvolvedores de acordo com os parametros", (done) => {
    request(server)
      .get("/developers")
      .query({ termo: "nome", busca: NOME_COMUM })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        expect(res.body.desenvolvedores).to.have.a.lengthOf(REGISTROS_COMUNS);
        done();
      });
  });

  it("Não deve retornar caso termo não seja válido", (done) => {
    const MENSAGEM_ERRO_TERMO = "O termo deve conter uma propriedade válida";

    request(server)
      .get("/developers")
      .query({ termo: "teste", busca: NOME_COMUM })
      .expect("Content-Type", /json/)
      .expect(404)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, MENSAGEM_ERRO_TERMO);
        done();
      });
  });

  it("Não deve retornar caso página ou limite não sejam válidos", (done) => {
    const MENSAGEM_ERRO_TERMO =
      "Valores inseridos para página e/ou limite incorretos";

    request(server)
      .get("/developers")
      .query({ pagina: -1, limite: "P" })
      .expect("Content-Type", /json/)
      .expect(404)
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.error, MENSAGEM_ERRO_TERMO);
        done();
      });
  });

  after(async () => {
    await conexao.getRepository(Desenvolvedor).clear();
    await conexao.close();
  });
});
