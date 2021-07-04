import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from "typeorm";
import moment from "moment";
import { IsDate, MinLength } from "class-validator";
import { sexoValido } from "../customValidators/ValidarSexo";

@Entity("DESENVOLVEDORES")
export class Desenvolvedor {
  @AfterLoad()
  setIdade() {
    this.idade = moment().diff(this.dataNascimento, "y");
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  @MinLength(1)
  nome: string;

  @Column({ type: "varchar", length: 1 })
  @sexoValido()
  sexo: string;

  idade: number;

  @Column()
  @MinLength(1)
  hobby: string;

  @Column()
  @IsDate()
  dataNascimento: Date;
}
