import React from "react";
import "./fontawesome";
import "./stylesheets/App.scss";
import { MyTrecipes } from "./pages/MyTrecipe/MyTrecipes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyTrecipes />
      </header>
    </div>
  );
}

export default App;
