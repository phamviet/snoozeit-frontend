import {createStore, compose} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'

import rootReducer from './reducers'

import posts from './data/posts';

const defaultState = {
    posts
};

const store = createStore(rootReducer, defaultState);

export default store;

export const history = syncHistoryWithStore(browserHistory, store);
