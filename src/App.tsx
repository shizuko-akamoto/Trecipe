import React from "react";
import "./components/fontawesome";
import "./App.scss";
import MyTrecipes from "./pages/MyTrecipes/MyTrecipes";
import ModalContainer from "./components/Modal/ModalContainer";
import { Trecipe } from "./pages/Trecipe/Trecipe";

function App() {
  return (
    <div className="App">
      <Trecipe />
      <ModalContainer />
    </div>
  );
}

export default App;
