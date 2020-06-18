import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import Trecipe from "./pages/Trecipe/Trecipe";
import MyTrecipes from "./pages/MyTrecipes/MyTrecipes";

function App() {
  return (
    <div className="App">
      {/*<Trecipe trecipeId={0} />*/}
      <MyTrecipes />
      <ModalContainer />
    </div>
  );
}

export default App;
