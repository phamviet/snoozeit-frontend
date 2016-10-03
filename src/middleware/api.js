import {Schema, arrayOf, normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import 'isomorphic-fetch'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const schemaMapping = {
    idAttribute: entity => entity.uuid.toLowerCase()
};

const userSchema = new Schema('users', schemaMapping);
const accountSchema = new Schema('accounts', schemaMapping);
const postSchema = new Schema('posts', schemaMapping);

postSchema.define({
    author: userSchema
});

// Schemas
export const Schemas = {
    USER: userSchema,
    ACCOUNT: accountSchema,
    ACCOUNTS: arrayOf(accountSchema),
    POST: postSchema,
    POSTS: arrayOf(postSchema)
};

// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
    const link = response.headers.get('link');
    if (!link) {
        return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
        return null
    }

    return nextLink.split(';')[0].slice(1, -1)
};




const callApi = (query) => {
    return fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
        credentials: 'include',
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }

            const nextPageUrl = getNextPageUrl(response);
            const {data} = json;

            let entities = {};

            Object.keys(data).forEach((key) => {
                let obj = data[key];
                if (!obj) {
                    // throw new Error('Need login')
                }

                if (obj.entity) {
                    const schema = Schemas[obj.entity.toUpperCase()];
                    const camelizedJson = camelizeKeys(data[key]);
                    Object.assign(entities, normalize(camelizedJson, schema))
                }

                if (obj.entities) {
                    Object.keys(obj.entities).forEach((entity) => {
                        const list = obj.entities[entity];
                        const schema = Schemas[entity.toUpperCase()];
                        const camelizedJson = camelizeKeys(list);
                        Object.assign(entities, normalize(camelizedJson, schema))
                    });
                }

                if (key !== 'me')
                    delete data[key]
            });

            return Object.assign({},
                data,
                entities,
                {nextPageUrl}
            )
        })
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {query} = callAPI;
    const {types} = callAPI;

    if (typeof query === 'function') {
        query = query(store.getState())
    }

    if (typeof query !== 'string') {
        throw new Error('query must be string')
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({type: requestType}));

    return callApi(query).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}
