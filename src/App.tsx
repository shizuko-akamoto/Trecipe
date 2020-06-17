import React from "react";
import { MyTrecipes } from "./pages/MyTrecipe/MyTrecipes";
import "./components/fontawesome";
import "./App.scss";
import { SearchBarPopup } from "./components/SearchBarPopup/SearchBarPopup";

function App() {
  return (
    <div className="App">
      <SearchBarPopup />
    </div>
  );
}

export default App;
