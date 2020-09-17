import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HigherOrderApp } from './components/App';
import { User } from './components/User';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact={true} path="/" component={HigherOrderApp} />
                <Route path="/:username" component={User} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
