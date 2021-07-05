import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from "typeorm";
import moment from "moment";
import { IsDate, MinLength } from "class-validator";
import { sexoValidator } from "../customValidators/SexoValidator";

@Entity("DESENVOLVEDORES")
export class Developer {
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
  @sexoValidator()
  sexo: string;

  idade: number;

  @Column()
  @MinLength(1)
  hobby: string;

  @Column()
  @IsDate()
  dataNascimento: Date;
}
