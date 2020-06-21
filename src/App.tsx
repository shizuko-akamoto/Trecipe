import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import Pages from "./pages/Pages";
import { reloadTrecipes } from "./redux/TrecipeList/action";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { BrowserRouter, Route } from "react-router-dom";

function App(props: ReturnType<typeof mapDispatchToProps>) {
  props.reloadTrecipes();
  return (
    <BrowserRouter>
      <div className="App">
        <Route component={Pages} />
        <ModalContainer />
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      reloadTrecipes,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(App);
