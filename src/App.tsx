import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import Trecipe from "./pages/Trecipe/Trecipe";

function App() {
  return (
    <div className="App">
      <Trecipe trecipeId={0} />
      <ModalContainer />
    </div>
  );
}

export default App;
