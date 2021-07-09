import React from "react";
import { Home } from "./pages/Home";
import { RemoteContextProvider } from "./contexts/RemoteContext";
import { ModalContextProvider } from "./contexts/ModalContext";

function App() {
  return (
    <ModalContextProvider>
      <RemoteContextProvider>
        <Home />
      </RemoteContextProvider>
    </ModalContextProvider>
  );
}

export default App;
