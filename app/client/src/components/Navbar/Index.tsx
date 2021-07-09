import DevCrudLogo from "../../assets/images/DevCrud.svg";
import "./navbar.sass";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useContext, useState } from "react";
import { RemoteContext } from "../../contexts/RemoteContext";

export function Navbar() {
  const [value, setValue] = useState<string>();
  const [field, setField] = useState<string>();
  const { search, setSearch } = useContext(RemoteContext);

  function buscar(event: FormEvent) {
    event.preventDefault();
    setSearch(undefined, undefined, field, value);
  }

  return (
    <nav
      className="is-flex is-justify-content-center is-align-items-center"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="is-flex is-flex-direction-column is-align-items-center ">
        <a className="is-flex logo">
          <img src={DevCrudLogo} alt="DevCRUD" />
        </a>
        <form
          className="card is-flex is-justify-content-center is-align-items-center"
          onSubmit={buscar}
        >
          <div className="is-flex is-align-items-center">
            <span className="icon">
              <FontAwesomeIcon size="lg" icon={faSearch} />
            </span>
            <input
              className="input"
              placeholder="Digite aqui a sua busca"
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <div className="is-divider is-hidden-mobile" />
          <div className="is-flex is-align-items-center">
            <span id="sliders" className="icon">
              <FontAwesomeIcon size="lg" icon={faSlidersH} />
            </span>
            <div className="select is-small">
              <select onChange={(event) => setField(event.target.value)}>
                <option value="" disabled selected hidden>
                  Selecione...
                </option>
                <option value="nome">Nome</option>
                <option value="hobby">Hobby</option>
                <option value="sexo">Sexo</option>
              </select>
            </div>
          </div>
          <button className="button is-primary" type="submit">
            BUSCAR
          </button>
        </form>
      </div>
    </nav>
  );
}
