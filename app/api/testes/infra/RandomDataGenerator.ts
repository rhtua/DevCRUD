import { Developer } from "../../src/business/entities/Developer";
import * as faker from "faker";
import moment from "moment/moment";

export function GenerateDevelopers() {
  return [
    {
      nome: `Valdisney ${faker.name.lastName()}`,
      hobby: faker.company.bs(),
      sexo: faker.random.arrayElement(["M", "F"]),
      dataNascimento: faker.date.between(
        moment().subtract(50, "y").toDate(),
        moment().subtract(10, "y").toDate()
      ),
    } as Developer,
    {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      hobby: "Criar apis em node",
      sexo: faker.random.arrayElement(["M", "F"]),
      dataNascimento: faker.date.between(
        moment().subtract(50, "y").toDate(),
        moment().subtract(10, "y").toDate()
      ),
    } as Developer,
    {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      hobby: faker.company.bs(),
      sexo: "O",
      dataNascimento: faker.date.between(
        moment().subtract(50, "y").toDate(),
        moment().subtract(10, "y").toDate()
      ),
    } as Developer,
    {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      hobby: faker.company.bs(),
      sexo: faker.random.arrayElement(["M", "F"]),
      dataNascimento: faker.date.between(
        moment().subtract(50, "y").toDate(),
        moment().subtract(10, "y").toDate()
      ),
    } as Developer,
  ];
}
