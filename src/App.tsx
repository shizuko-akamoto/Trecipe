import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import { reloadTrecipes } from "./redux/TrecipeList/action";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

function App(props: ReturnType<typeof mapDispatchToProps>) {
  props.reloadTrecipes();
  return (
    <Router basename={"/myTrecipes"}>
      <div className="App">
        <Route component={Pages} />
        <ModalContainer />
      </div>
    </Router>
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
