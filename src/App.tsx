import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import { Trecipe } from "./pages/Trecipe/Trecipe";
import { StaticMap } from "./components/Map/StaticMap";

function App() {
  return (
    <div className="App">
      <Trecipe />
      <StaticMap />
      <ModalContainer />
    </div>
  );
}

export default App;
