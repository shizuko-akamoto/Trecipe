import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import Pages from "./pages/Pages";
import { reloadTrecipes } from "./redux/TrecipeList/action";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { newDestinationModel } from "./redux/Destinations/types";
import { DestinationCard } from "./pages/Map/DestinationCard/DestinationCard";

function App(props: ReturnType<typeof mapDispatchToProps>) {
  props.reloadTrecipes();
  const destModel = newDestinationModel();
  return (
    <Router>
      <div className="App">
        <DestinationCard
          destModel={destModel}
          onClickComplete={() => {}}
          onClickDelete={() => {}}
          isCompleted={true}
          index={0}
        />
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
