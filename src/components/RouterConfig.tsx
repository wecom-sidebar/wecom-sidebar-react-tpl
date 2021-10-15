import React, {FC} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Actions from "../pages/Actions";
import ExternalUser from "../pages/ExternalUser";
import ExternalChat from "../pages/ExternalChat";

const RouterConfig: FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/actions">
        <Actions/>
      </Route>
      <Route path="/external-user">
        <ExternalUser/>
      </Route>
      <Route path="/external-chat">
        <ExternalChat/>
      </Route>
    </Switch>
  )
}

export default RouterConfig;
