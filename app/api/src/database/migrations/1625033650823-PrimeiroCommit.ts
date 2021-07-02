import {MigrationInterface, QueryRunner} from "typeorm";

export class PrimeiroCommit1625033650823 implements MigrationInterface {
    name = 'PrimeiroCommit1625033650823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `DESENVOLVEDORES` (`id` int NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL, `sexo` char NOT NULL, `idade` int NOT NULL, `hobby` varchar(255) NOT NULL, `datanascimento` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `DESENVOLVEDORES`");
    }

}
