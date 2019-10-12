import React from "react";
import { Redirect, Switch } from "react-router-dom";
import Routes from './router';
import PrivateRoute from './PrivateRoute'
// import routesMap from './routesMap';

function Router() {
  return (
    <Switch>
      {
        Routes.map((v, i) => (
          <PrivateRoute key={i} path={v.path} exact={v.exact || false} component={v.component} />
        ))
      }
      <Redirect exact from='/' to='/home'/>
    </Switch>
  );
}

export default Router;