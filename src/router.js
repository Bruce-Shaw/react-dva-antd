// .src/router.js
import React from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
// import IndexPage from './routes/IndexPage';
import Products from './routes/Products';

const { ConnectedRouter } = routerRedux;

const routes = [
  // { path: '/index', component: IndexPage },
  { path: '/products', component: Products },
];

function RouterConfig({ history, app }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route
              exact
              key={key}
              path={path}
              component={dynamic({ app, ...dynamics })}
            />
          ))
        }
      </Switch>
    </ConnectedRouter>
  );

}

export default RouterConfig;
