import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Desenvolvedor } from "../../../business/entities/Desenvolvedor";
import { GerarDevs } from "../../../../testes/infra/DadosQuaseAleatorios";
import { DesenvolvedorRepository } from "../../../business/repositories/DesenvolvedorRepository";

export class TestesSeed1625306997479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let desenvolvedoresAutoGerados = () => {
      let lista: Desenvolvedor[] = [];
      for (let i = 0; i < 5; i++) {
        lista = lista.concat(GerarDevs());
      }
      return lista;
    };

    await getCustomRepository(DesenvolvedorRepository).save(
      desenvolvedoresAutoGerados()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
