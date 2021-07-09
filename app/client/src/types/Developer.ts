import { ReactNode } from "react";

export type Developer = {
  id: number;
  nome: string;
  hobby: string;
  sexo: string;
  dataNascimento: Date;
  idade: number;
};

export type DeveloperRequest = {
  id: number;
  nome: string;
  hobby: string;
  sexo: string;
  dataNascimento: string;
  idade: number;
};
