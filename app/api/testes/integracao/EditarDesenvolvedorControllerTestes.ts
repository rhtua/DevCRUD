import { Server } from "../../src/server";
import { Connection } from "typeorm";
import { bancoDeTestes } from "../infra/conexoes";
import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import request from "supertest";
import { assert } from "chai";
import moment from "moment/moment";

describe("Método PUT /developers/ID", () => {
  const REGISTROS_TOTAIS = 20;
  let conexao: Connection;
  const server = new Server().api;
  const NOVO_NOME_VALIDO = "Novo Nome Para Teste";
  const NOVO_NOME_INVALIDO = "";
  const HANDLE_ALEATORIO = Math.round(Math.random() * (20 - 1) + 1);
  let desenvolvedorAleatorio: Desenvolvedor;

  before(async () => {
    conexao = await bancoDeTestes();
    desenvolvedorAleatorio = (await conexao
      .getRepository(Desenvolvedor)
      .findOne(HANDLE_ALEATORIO)) as Desenvolvedor;
  });

  it("Deve editar o desenvolvedor desejado corretamente", (done) => {
    let devParaEditar = desenvolvedorAleatorio;
    devParaEditar.nome = NOVO_NOME_VALIDO;

    request(server)
      .put(`/developers/${HANDLE_ALEATORIO}`)
      .send({
        nome: devParaEditar.nome,
        hobby: devParaEditar.hobby,
        sexo: devParaEditar.sexo,
        dataNascimento: moment(devParaEditar.dataNascimento).format(
          "YYYY-MM-DD"
        ),
      })
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.body.nome, NOVO_NOME_VALIDO);
        assert.equal(res.body.id, HANDLE_ALEATORIO);
        done();
      });
  });

  it("Deve validar todos os campos e retornar erro para cada preenchido incorretamente", (done) => {
    const MENSAGEM_ERRO_NOME = "O campo nome está preenchido incorretamente!";

    request(server)
      .put(`/developers/${HANDLE_ALEATORIO}`)
      .send({
        nome: NOVO_NOME_INVALIDO,
        hobby: desenvolvedorAleatorio.hobby,
        sexo: desenvolvedorAleatorio.sexo,
        dataNascimento: moment(desenvolvedorAleatorio.dataNascimento).format(
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

        assert.equal(res.body.error, MENSAGEM_ERRO_NOME);
        done();
      });
  });

  after(async () => {
    await conexao.getRepository(Desenvolvedor).clear();
    await conexao.close();
  });
});
