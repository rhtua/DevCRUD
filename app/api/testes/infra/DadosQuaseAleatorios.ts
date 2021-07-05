import { Desenvolvedor } from "../../src/business/entities/Desenvolvedor";
import * as faker from "faker";
import moment from "moment/moment";

export function GerarDevs() {
  return [
    {
      nome: `Valdisney ${faker.name.lastName()}`,
      hobby: faker.company.bs(),
      sexo: faker.random.arrayElement(["M", "F"]),
      dataNascimento: faker.date.past(),
    } as Desenvolvedor,
    {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      hobby: "Criar apis em node",
      sexo: faker.random.arrayElement(["M", "F"]),
      dataNascimento: faker.date.past(),
    } as Desenvolvedor,
    {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      hobby: faker.company.bs(),
      sexo: "O",
      dataNascimento: faker.date.past(),
    } as Desenvolvedor,
    {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      hobby: faker.company.bs(),
      sexo: faker.random.arrayElement(["M", "F"]),
      dataNascimento: moment("2000-03-13").toDate(),
    } as Desenvolvedor,
  ];
}
