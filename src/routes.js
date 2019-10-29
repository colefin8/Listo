import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import List from "./Components/List/List";
import ItemPage from "./Components/ItemPage/ItemPage";
import NewList from "./Components/NewList/NewList";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/list/:listid" component={List} />
    <Route path="/item/:itemid" component={ItemPage} />
    <Route path="/new-list" component={NewList} />
  </Switch>
);
