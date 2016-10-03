import { CALL_API } from '../middleware/api'

export const GRAPHQL_REQUEST = 'GRAPHQL_REQUEST';
export const GRAPHQL_SUCCESS = 'GRAPHQL_SUCCESS';
export const GRAPHQL_FAILURE = 'GRAPHQL_FAILURE';

export const ME_REQUEST = 'ME_REQUEST';
export const ME_SUCCESS = 'ME_SUCCESS';
export const ME_FAILURE = 'ME_FAILURE';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchInitialData = () => ({
    [CALL_API]: {
        types: [ME_REQUEST, ME_SUCCESS, ME_FAILURE],
        query: 'query{ me { entity, email, username, name, uuid, tz }}'
    }
});

// Fetches a initial user information
// Relies on Redux Thunk middleware.
export const loadInitialData = (requiredFields = ['uuid']) => (dispatch, getState) => {
    const me = getState().me;
    if (me && requiredFields.every(key => me.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchInitialData())
};


const fetchPosts = (username) => ({
    payload: {username},
    [CALL_API]: {
        types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE],
        query: 'query{me{entities(types: ["post"]){posts{uuid,entity,content,created_at, author{uuid}}}}}'
    }
});

export const loadPosts = (username, nextPage) => (dispatch, getState) => {
    const {
        pageCount = 0
    } = getState().pagination.postPagination[username] || {};

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchPosts(username));
};

export const LOGOUT = 'LOGOUT';
export const logout = () => (dispatch, getState) => {
    return dispatch({
        type: LOGOUT
    });
};

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const login = () => (dispatch, getState) => {
    return dispatch({
        type: LOGIN
    });
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});