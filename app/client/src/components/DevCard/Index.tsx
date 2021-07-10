import "./dev-card.sass";
import { ReactNode, useContext, useState } from "react";
import userLogo from "../../assets/images/user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Developer } from "../../types/Developer";
import { ModalContext } from "../../contexts/ModalContext";

export function DevCard({
  id,
  nome,
  hobby,
  sexo,
  dataNascimento,
  idade,
}: Developer) {
  const { modalProps, setModalProps } = useContext(ModalContext);
  const dev = {
    id: id,
    nome: nome,
    hobby: hobby,
    sexo: sexo,
    dataNascimento: dataNascimento,
    idade: idade,
  } as Developer;

  return (
    <div className="card is-flex dev-card is-align-items-center is-flex-wrap-wrap is-justify-content-space-between">
      <div className="is-flex user-info">
        <div className="is-flex user">
          <img src={userLogo} alt="Imagem usuário" />
        </div>
        <div className="info is-flex is-flex-direction-column">
          <p className="title">{`${nome}, ${idade}`}</p>
          <div className="hobby is-flex">{hobby}</div>
        </div>
      </div>
      <div className="is-flex is-align-items-center buttons-card is-justify-content-center">
        <div className="is-divider is-hidden-mobile is-flex" />
        <div className="is-space is-hidden-desktop" />
        <button
          className="button is-info ed"
          onClick={() => setModalProps(dev, true)}
        >
          <span className="icon">
            <FontAwesomeIcon size="lg" icon={faPencilAlt} />
          </span>
        </button>
        <button
          className="button is-danger ed"
          onClick={() => setModalProps(dev, undefined, true)}
        >
          <span className="icon">
            <FontAwesomeIcon size="lg" icon={faTimes} />
          </span>
        </button>
      </div>
    </div>
  );
}
