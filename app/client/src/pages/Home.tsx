import { Navbar } from "../components/Navbar/Index";
import { CounterEAdd } from "../components/Counter&Add/Index";
import { Developers } from "../components/Developers/Index";
import React from "react";
import { Confirmation, Modal } from "../components/Modal/Index";
export function Home() {
  return (
    <div className="is-flex is-flex-direction-column main">
      <Navbar />
      <CounterEAdd />
      <Developers />
      <Modal />
      <Confirmation />
    </div>
  );
}
