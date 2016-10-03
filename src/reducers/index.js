import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import merge from 'lodash/merge'
import * as ActionTypes from '../actions'
import paginate from './paginate'

// Find me.
const me = (state = {authenticated: false, needLogin: false}, action) => {
    if (action.type === ActionTypes.ME_SUCCESS) {
        return merge({}, state, action.response.me, {authenticated: true, needLogin: false});
    }

    if ([ActionTypes.LOGOUT, ActionTypes.ME_FAILURE].includes(action.type)) {
        return {authenticated: false, needLogin: true};
    }

    return state;
};

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {users: {}, accounts: {}, posts: {}}, action) => {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
};

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
    const { type, error } = action

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return action.error
    }

    return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
    postPagination: paginate({
        mapActionToKey: action => action.payload.username,
        types: [
            ActionTypes.POST_REQUEST,
            ActionTypes.POST_SUCCESS,
            ActionTypes.POST_FAILURE
        ]
    }),
    // stargazersByRepo: paginate({
    //     mapActionToKey: action => action.fullName,
    //     types: [
    //         ActionTypes.STARGAZERS_REQUEST,
    //         ActionTypes.STARGAZERS_SUCCESS,
    //         ActionTypes.STARGAZERS_FAILURE
    //     ]
    // })
});

const rootReducer = combineReducers({
    me,
    entities,
    pagination,
    errorMessage,
    routing: routerReducer
});

export default rootReducer;