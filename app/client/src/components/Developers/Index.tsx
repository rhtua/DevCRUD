import "./developers.sass";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DevCard } from "../DevCard/Index";
import React, { useContext, useEffect } from "react";
import { RemoteContext } from "../../contexts/RemoteContext";

export function Developers() {
  const { search, setSearch } = useContext(RemoteContext);
  const totalPaginas = Math.ceil(search.count / search.limit);

  useEffect(() => {
    setSearch();
  }, []);

  function paginate(page: number) {
    setSearch(page);
  }

  return (
    <div className="is-flex is-flex-direction-column contain is-justify-content-space-between">
      <div className="is-flex is-flex-direction-row">
        <div className="is-flex section is-align-items-center is-justify-content-center">
          <button
            className="button"
            onClick={() => {
              if (search.page > 1) {
                paginate(search.page - 1);
              }
            }}
          >
            <span className="icon">
              <FontAwesomeIcon size="2x" icon={faAngleLeft} />
            </span>
          </button>
        </div>
        <div className="is-flex cards-footer is-flex-direction-column is-align-items-center is-justify-content-space-between">
          <div className="is-flex is-flex-direction-column is-align-items-center devs">
            {search &&
              search.developers?.map((developer) => {
                return (
                  <DevCard
                    key={developer.id}
                    id={developer.id}
                    nome={developer.nome}
                    hobby={developer.hobby}
                    sexo={developer.sexo}
                    dataNascimento={developer.dataNascimento}
                    idade={developer.idade}
                  />
                );
              })}
          </div>
          <footer>
            Pagina {Number.isNaN(totalPaginas) ? 0 : search.page} de{" "}
            {Number.isNaN(totalPaginas) ? 0 : totalPaginas}
          </footer>
        </div>
        <div className="is-flex section is-align-items-center is-justify-content-center">
          <button
            className="button"
            onClick={() => {
              if (search.page < totalPaginas) {
                paginate(search.page + 1);
              }
            }}
          >
            <span className="icon">
              <FontAwesomeIcon size="2x" icon={faAngleRight} />
            </span>
          </button>
        </div>
      </div>
      <div className="is-flex copy">Arthur Oliveira &copy; 2021</div>
    </div>
  );
}
