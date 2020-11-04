import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import OrgList from "./containers/OrgList";
import Manage from "./containers/Manage";
import Compose from "./containers/Compose";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
      <Route exact path="/orgList">
        <OrgList />
      </Route>
      <Route exact path="/compose">
        <Compose />
      </Route>
      <Route exact path="/manage">
        <Manage />
      </Route>
      <Route exact path="/myaccount">
        <Manage />
      </Route>
      {/* Finally, catch all unmatched routes */}
        <Route>
          <NotFound />
        </Route>
    </Switch>
  );
}