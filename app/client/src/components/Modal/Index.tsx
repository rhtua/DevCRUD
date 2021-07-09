import "./modal.sass";
import {
  faMars,
  faAngleRight,
  faVenus,
  faVenusMars,
  faCheck,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import moment from "moment";
import remote from "../../remote";
import { RemoteContext } from "../../contexts/RemoteContext";

export function Modal() {
  const { setSearch } = useContext(RemoteContext);
  const { modalProps, setModalProps } = useContext(ModalContext);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);
  const [newNome, setNewNome] = useState<string>();
  const [newDataNasc, setNewDataNasc] = useState<string>();
  const [newHobby, setNewHobby] = useState<string>();
  const [newSexo, setNewSexo] = useState<string>();

  useEffect(() => {
    setNewSexo(modalProps?.developer?.sexo);
    setNewNome(modalProps?.developer?.nome);
    setNewDataNasc(
      moment(modalProps?.developer?.dataNascimento).format("YYYY-MM-DD")
    );
    setNewHobby(modalProps?.developer?.hobby);
  }, [modalProps?.developer]);

  async function insertDeveloper() {
    await remote
      .post("/developers", {
        nome: newNome,
        hobby: newHobby,
        sexo: newSexo,
        dataNascimento: newDataNasc,
      })
      .then(() => setIsSucess(true))
      .catch(() => setIsError(true));
  }

  async function editDeveloper() {
    await remote
      .put(`/developers/${modalProps?.developer?.id}`, {
        nome: newNome,
        hobby: newHobby,
        sexo: newSexo,
        dataNascimento: newDataNasc,
      })
      .then(() => setIsSucess(true))
      .catch(() => setIsError(true));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (modalProps?.developer) {
      editDeveloper();
    } else {
      insertDeveloper();
    }

    setSearch();
  }

  function cleanModal() {
    setModalProps(undefined, false);
    setNewSexo("");
    setNewNome("");
    setNewHobby("");
    setNewDataNasc("");
    setIsError(false);
    setIsSucess(false);
  }

  return (
    <div className={`modal ${modalProps?.isOpen && "is-active"}`}>
      <div className="modal-background" />
      <div className="modal-card is-flex">
        <header className="is-flex is-align-items-center is-justify-content-center modal-card-head">
          <div
            className={`titulo-modal is-flex is-flex-direction-column is-align-items-center ${
              isError || isSuccess ? "inactive" : ""
            }`}
          >
            <span className="modal-card-title">
              {modalProps?.developer
                ? "Edite os dados desejados"
                : "Insira os dados do novo desenvolvedor"}
            </span>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <section
            className={`modal-card-body is-flex is-flex-direction-column  ${
              isError || isSuccess ? "inactive" : ""
            }`}
          >
            <label className="label">Nome completo</label>
            <input
              className="input nome"
              required
              placeholder="ex. Jose Silva"
              value={newNome}
              minLength={5}
              type="text"
              onChange={(event) => {
                setNewNome(event.target.value);
              }}
            />
            <label className="label">Hobby</label>
            <textarea
              placeholder="O que gosta de fazer no tempo livre?"
              className="textarea large"
              required
              value={newHobby}
              minLength={5}
              rows={2}
              onChange={(event) => {
                setNewHobby(event.target.value);
              }}
            />
            <div className="is-flex dts">
              <div className="is-flex is-flex-direction-column">
                <label className="label">Nascimento</label>
                <input
                  className="input birth"
                  required
                  value={newDataNasc}
                  max={moment().format("YYYY-MM-DD")}
                  type="date"
                  onChange={(event) => {
                    setNewDataNasc(event.target.value);
                  }}
                />
              </div>
              <div className="is-flex is-flex-direction-column">
                <label className="label">Gênero</label>
                <div className="is-flex is-justify-content-space-between  control">
                  <input
                    type="radio"
                    required
                    name="answer"
                    value="F"
                    id="F"
                    checked={newSexo === "F"}
                    onChange={(event) => {
                      setNewSexo(event.target.value);
                    }}
                  />
                  <label htmlFor="F" className="radio">
                    <FontAwesomeIcon size="2x" icon={faVenus} />
                  </label>
                  <input
                    type="radio"
                    name="answer"
                    value="M"
                    id="M"
                    checked={newSexo === "M"}
                    onChange={(event) => {
                      setNewSexo(event.target.value);
                    }}
                  />
                  <label className="radio" htmlFor="M">
                    <FontAwesomeIcon size="2x" icon={faMars} />
                  </label>
                  <input
                    type="radio"
                    name="answer"
                    value="O"
                    id="O"
                    checked={newSexo === "O"}
                    onChange={(event) => {
                      setNewSexo(event.target.value);
                    }}
                  />
                  <label className="radio" htmlFor="O">
                    <FontAwesomeIcon size="2x" icon={faVenusMars} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section
            className={`modal-card-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center ${
              !isSuccess ? "inactive" : ""
            }`}
          >
            <span className="is-large sucess">
              <FontAwesomeIcon size="3x" icon={faCheckCircle} />
            </span>
            <span className="is-large sucess">SALVO COM SUCESSO</span>
          </section>

          <section
            className={`modal-card-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center ${
              !isError ? "inactive" : ""
            }`}
          >
            <span className="is-large error">
              <FontAwesomeIcon size="3x" icon={faTimesCircle} />
            </span>
            <span className="is-large error">ERRO AO SALVAR</span>
          </section>

          <footer className="modal-card-foot is-flex is-justify-content-center">
            <button className="button is-info" onClick={() => cleanModal()}>
              FECHAR
            </button>
            <button
              className={`button is-primary ${
                isError || isSuccess ? "inactive" : ""
              }`}
              type="submit"
            >
              <span>CONCLUIR</span>
              <span className="is-small">
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export function Confirmation() {
  const { modalProps, setModalProps } = useContext(ModalContext);
  const { setSearch } = useContext(RemoteContext);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);

  async function deleteDeveloper() {
    await remote
      .delete(`/developers/${modalProps?.developer?.id}`)
      .then(() => setIsSucess(true))
      .catch(() => setIsError(true));
    setSearch();
  }

  return (
    <div
      className={`modal confirmation ${
        modalProps?.isConfirmation ? "is-active" : ""
      }`}
    >
      <div className="modal-background" />
      <div className="modal-card is-flex is-align-items-center is-justify-content-center">
        <header className="modal-card-head is-flex-direction-row is-flex is-justify-content-center">
          <span
            className={`modal-card-title is-flex ${
              isError || isSuccess ? "inactive" : ""
            }`}
          >
            Deseja mesmo excluir {modalProps?.developer?.nome}?
          </span>
        </header>
        <section
          className={`modal-card-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center ${
            !isSuccess ? "inactive" : ""
          }`}
        >
          <span className="is-large sucess">
            <FontAwesomeIcon size="3x" icon={faCheckCircle} />
          </span>
          <span className="is-large sucess">EXCLUÍDO COM SUCESSO</span>
        </section>

        <section
          className={`modal-card-body is-flex is-flex-direction-column is-justify-content-center is-align-items-center ${
            !isError ? "inactive" : ""
          }`}
        >
          <span className="is-large error">
            <FontAwesomeIcon size="3x" icon={faTimesCircle} />
          </span>
          <span className="is-large error">ERRO AO EXCLUIR</span>
        </section>

        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button
            className="button is-info"
            onClick={() => {
              setModalProps(undefined, undefined, false);
              setIsError(false);
              setIsSucess(false);
            }}
          >
            FECHAR
          </button>
          <button
            className={`button is-primary ${
              isError || isSuccess ? "inactive" : ""
            }`}
            onClick={() => deleteDeveloper()}
          >
            <span>CONFIRMAR</span>
            <span className="is-small">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </button>
        </footer>

        {/*<footer className="modal-card-foot is-flex is-justify-content-center">*/}
        {/*  <button*/}
        {/*    className="button is-info"*/}
        {/*    onClick={() => setModalProps(undefined, undefined, false)}*/}
        {/*  >*/}
        {/*    CANCELAR*/}
        {/*  </button>*/}
        {/*  <button*/}
        {/*    className="button is-primary"*/}
        {/*    onClick={() => deleteDeveloper()}*/}
        {/*  >*/}
        {/*    <span>CONFIRMAR</span>*/}
        {/*    <span className="is-small">*/}
        {/*      <FontAwesomeIcon icon={faCheck} />*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*</footer>*/}
      </div>
    </div>
  );
}

function ErrorView() {
  return <></>;
}
