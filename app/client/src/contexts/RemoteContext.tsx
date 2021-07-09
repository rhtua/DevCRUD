import { createContext, ReactNode, useState } from "react";
import { Developer, DeveloperRequest } from "../types/Developer";
import remote from "../remote";

type RemoteContextType = {
  search: SetSearchType;
  setSearch: (
    page?: number,
    limit?: number,
    field?: string,
    value?: string
  ) => Promise<void>;
};

type SetSearchType = {
  developers: Developer[];
  page: number;
  limit: number;
  field: string | undefined;
  value: string | undefined;
  count: number;
};

type RemoteContextProviderProps = {
  children: ReactNode;
};

export const RemoteContext = createContext({} as RemoteContextType);

export function RemoteContextProvider(props: RemoteContextProviderProps) {
  const [search, setDevelopers] = useState<SetSearchType>({} as SetSearchType);

  async function setSearch(
    page: number = 1,
    limit: number = 3,
    field?: string,
    value?: string
  ) {
    const response = await remote
      .get("/developers", {
        params: {
          limit: limit,
          field: field ?? search?.field,
          page: page ?? search?.page,
          value: value ?? search?.value,
        },
      })
      .catch(() => console.log("deu erro"));

    const parsedDevelopers: Developer[] = response?.data.developers.map(
      (dev: DeveloperRequest) => {
        return {
          id: dev.id,
          nome: dev.nome,
          hobby: dev.hobby,
          sexo: dev.sexo,
          idade: dev.idade,
          dataNascimento: new Date(dev.dataNascimento),
        };
      }
    );

    setDevelopers({
      developers: parsedDevelopers,
      field: field ?? search?.field,
      limit: limit,
      page: page ?? search?.page,
      value: value ?? search?.value,
      count: response?.data.count,
    });
  }

  return (
    <RemoteContext.Provider value={{ search: search, setSearch: setSearch }}>
      {props.children}
    </RemoteContext.Provider>
  );
}
