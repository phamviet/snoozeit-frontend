import 'isomorphic-fetch'
import {Schema, arrayOf} from 'normalizr'

const fragmentDefs = {
    userInfo: `
        fragment userInfo on User {
            uuid,
            name
            email
            username
        }
    `,
    accountInfo: `
        fragment accountInfo on Account {
            uuid,
            account_type
            account_identifier
        }
    `,
    postInfo: `
        fragment postInfo on Post {
            uuid
            content
            author {
                uuid
                name
            }
            created_at
            published_at
        }
    `
};

const graphQL = (query, variables) => {
    const matches = query.match(/([.]{3}([\w]+))/g) || [];
    const fragments = matches.map(name => fragmentDefs[name.replace("...", "")]);
    fragments.push(query);

    return fetch('/graphql', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: fragments.join("\n"),
            variables
        }),
        credentials: 'include',
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        )
        .then(({json, response}) => {

            if (!response.ok) {
                return Promise.reject({json, response})
            }

            if (json.errors) {
                return Promise.reject(json.errors)
            }

            return json.data;
        })
};

const schema = {
    idAttribute: entity => entity.uuid.toLowerCase()
};

const userSchema = new Schema('users', schema);
const accountSchema = new Schema('accounts', schema);
const postSchema = new Schema('posts', schema);

userSchema.define({
    accounts: arrayOf(accountSchema),
    posts: arrayOf(postSchema)
});

postSchema.define({
    author: userSchema
});

export const Schemas = {
    USER: userSchema,
    ACCOUNT: accountSchema,
    ACCOUNTS: arrayOf(accountSchema),
    POST: postSchema,
    POSTS: arrayOf(postSchema)
};

export default graphQL;