import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import ListPage from "./Components/ListPage/ListPage";
import ItemPage from "./Components/ItemPage/ItemPage";
import NewList from "./Components/NewList/NewList";
import User from "./Components/User/User";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route
      path="/dashboard"
      render={() => {
        return (
          <>
            <Nav />
            <Dashboard />
          </>
        );
      }}
    />
    <Route
      path="/list/:listid"
      render={() => {
        return (
          <>
            <Nav />
            <ListPage />
          </>
        );
      }}
    />
    <Route
      path="/item/:itemid"
      render={() => {
        return (
          <>
            <Nav />
            <ItemPage />
          </>
        );
      }}
    />
    <Route
      path="/new-list"
      render={() => {
        return (
          <>
            <Nav />
            <NewList />
          </>
        );
      }}
    />
    <Route path="/user" component={User} />
  </Switch>
);
