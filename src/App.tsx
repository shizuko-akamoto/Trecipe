import React from "react";
import "./components/fontawesome";
import "./App.scss";
import MyTrecipes from "./pages/MyTrecipes/MyTrecipes";
import ModalContainer from "./components/Modal/ModalContainer";

function App() {
  return (
    <div className="App">
      <MyTrecipes />
      <ModalContainer />
    </div>
  );
}

export default App;
