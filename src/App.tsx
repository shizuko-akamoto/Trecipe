import React from "react";
import "./components/fontawesome";
import "./App.scss";
import { Trecipe } from "./pages/Trecipe/Trecipe";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;
