import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarBanco1625304002091 implements MigrationInterface {
  name = "CriarBanco1625304002091";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `DESENVOLVEDORES` DROP COLUMN `sexo`");
    await queryRunner.query(
      "ALTER TABLE `DESENVOLVEDORES` ADD `sexo` varchar(1) NOT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `DESENVOLVEDORES` DROP COLUMN `sexo`");
    await queryRunner.query(
      "ALTER TABLE `DESENVOLVEDORES` ADD `sexo` char(1) NOT NULL"
    );
  }
}
