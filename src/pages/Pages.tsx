import React from "react";
import { Route, Switch } from "react-router-dom";
import MyTrecipes from "./MyTrecipes/MyTrecipes";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const Pages = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <MyTrecipes />
        </Route>
        {/*<Route path="/:trecipeId">*/}
        {/*  <Trecipe />*/}
        {/*</Route>*/}
      </Switch>
      <Footer />
    </div>
  );
};

export default Pages;