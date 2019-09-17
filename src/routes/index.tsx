import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from './router';
// import routesMap from './routesMap';

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          {
            Routes.map((v, i) => (
              <Route key={i} path={v.path} exact={v.exact || false} component={v.component} />
            ))
          }
        </Switch>
      </Suspense>
      
    </BrowserRouter>
  );
}

export default Router;