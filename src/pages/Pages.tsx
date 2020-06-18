import React from "react";
import { Route, Switch } from "react-router-dom";
import MyTrecipes from "./MyTrecipes/MyTrecipes";
import Trecipe from "./Trecipe/Trecipe";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MyTrecipes />
      </Route>
      <Route path="/:trecipeId">
        <Trecipe />
      </Route>
    </Switch>
  );
};

export default Pages;
