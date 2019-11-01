import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import ListPage from "./Components/ListPage/ListPage";
import ItemPage from "./Components/ItemPage/ItemPage";
import NewList from "./Components/NewList/NewList";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/list/:listid" component={ListPage} />
    <Route path="/item/:itemid" component={ItemPage} />
    <Route path="/new-list" component={NewList} />
  </Switch>
);
