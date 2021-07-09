import { ReactNode } from "react";

export type Request = {
  page: number;
  limit: number;
  field: string;
  value: string;
  children?: ReactNode;
};
