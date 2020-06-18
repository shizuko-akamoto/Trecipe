import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import { createBrowserHistory } from "history";

function App() {
  return (
    <Router basename={"/myTrecipes"}>
      <div className="App">
        <Route component={Pages} />
        <ModalContainer />
      </div>
    </Router>
  );
}

export default App;
