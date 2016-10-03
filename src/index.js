import React from 'react';

import './assets/font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
);