import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Developer } from "../../../business/entities/Developer";
import { GenerateDevelopers } from "../../../../testes/infra/RandomDataGenerator";
import { DeveloperRepository } from "../../../business/repositories/DeveloperRepository";

export class TestsSeed1625306997479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let desenvolvedoresAutoGerados = () => {
      let lista: Developer[] = [];
      for (let i = 0; i < 5; i++) {
        lista = lista.concat(GenerateDevelopers());
      }
      return lista;
    };

    await getCustomRepository(DeveloperRepository).save(
      desenvolvedoresAutoGerados()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
