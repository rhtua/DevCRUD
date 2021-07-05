import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { bancoDeTestes } from "../infra/conexoes";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import request from "supertest";
import { assert } from "chai";
import moment from "moment/moment";

describe("Método PUT /developers", () => {
  const REGISTROS_TOTAIS = 20;
  let conexao: Connection;
  const server = new Server().api;

  const DEV_TESTE = {
    nome: "Teste Dev",
    hobby: "Ser objeto de teste",
    sexo: "O",
    dataNascimento: "1969-06-28",
    id: REGISTROS_TOTAIS + 1,
  };

  before(async () => {
    conexao = await bancoDeTestes();
  });

  it("Deve inserir o desenvolvedor passado corretamente", (done) => {
    request(server)
      .post("/developers")
      .send({
        nome: DEV_TESTE.nome,
        hobby: DEV_TESTE.hobby,
        sexo: DEV_TESTE.sexo,
        dataNascimento: DEV_TESTE.dataNascimento,
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        let devCriado = res.body;
        devCriado.dataNascimento = moment(devCriado.dataNascimento).format(
          "YYYY-MM-DD"
        );
        assert.deepEqual(devCriado, DEV_TESTE);
        done();
      });
  });

  it("Deve validar todos os campos e retornar erro para cada preenchido incorretamente", (done) => {
    const MENSAGEM_ERRO_CAMPOS =
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

        assert.equal(res.body.error, MENSAGEM_ERRO_CAMPOS);
        done();
      });
  });

  after(async () => {
    await conexao.getRepository(Desenvolvedor).clear();
    await conexao.close();
  });
});
