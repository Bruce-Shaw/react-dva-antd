import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './routes/App';

const RouterConfig = ({ history, app }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" render={props => <App app={app} {...props} />} /> 
      </Switch>
    </Router>
  );

}

export default RouterConfig;
