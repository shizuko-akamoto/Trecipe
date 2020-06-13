import React from "react";
import MyTrecipes from "./pages/MyTrecipes/MyTrecipes";
import "./components/fontawesome";
import "./App.scss";
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
