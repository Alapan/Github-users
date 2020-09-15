import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import User from './User';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={App} />
        <Route path="/:username" component={User} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
