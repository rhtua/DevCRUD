import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarBanco1625867695308 implements MigrationInterface {
    name = 'CriarBanco1625867695308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `DESENVOLVEDORES` (`id` int NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL, `sexo` varchar(1) NOT NULL, `hobby` varchar(255) NOT NULL, `dataNascimento` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `DESENVOLVEDORES`");
    }

}
