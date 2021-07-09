import "./counter&add.sass";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemoteContext } from "../../contexts/RemoteContext";

export function CounterEAdd() {
  const { setModalProps } = useContext(ModalContext);
  const { search } = useContext(RemoteContext);

  return (
    <div className="is flex is-full is-justify-content-center">
      <div className="counter-e-add is-flex is-justify-content-space-between is-align-items-center">
        <span>
          Total de registros: {search.count == undefined ? 0 : search.count}
        </span>
        <button
          className="button is-primary is-flex is-align-items-center is-justify-content-center"
          onClick={() => setModalProps(undefined, true)}
        >
          <span>ADICIONAR</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      </div>
    </div>
  );
}
