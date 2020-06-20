import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import { Trecipe } from "./pages/Trecipe/Trecipe";
import { UserIcon } from "./components/UserIcon/userIcon";

function App() {
  return (
    <div className="App">
      <UserIcon />
      <ModalContainer />
    </div>
  );
}

export default App;
