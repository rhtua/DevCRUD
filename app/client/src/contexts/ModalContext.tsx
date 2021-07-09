import { createContext, ReactNode, useEffect, useState } from "react";
import { Developer } from "../types/Developer";

type ModalContextType = {
  modalProps: ModalType | undefined;
  setModalProps: (
    dev?: Developer,
    isOpen?: boolean,
    isConfirmation?: boolean
  ) => void;
};

type ModalType = {
  developer?: Developer;
  isOpen?: boolean;
  isConfirmation?: boolean;
};

type ModalContextProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext({} as ModalContextType);

export function ModalContextProvider(props: ModalContextProviderProps) {
  const [modalProps, setModal] = useState<ModalType>();

  function setModalProps(
    dev?: Developer,
    isOpen: boolean = false,
    isConfirmation: boolean = false
  ) {
    console.log(isOpen);
    setModal({
      developer: dev,
      isOpen: isOpen,
      isConfirmation: isConfirmation,
    });
  }

  return (
    <ModalContext.Provider value={{ modalProps, setModalProps }}>
      {props.children}
    </ModalContext.Provider>
  );
}
