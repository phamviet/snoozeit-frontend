import {Schema, arrayOf} from 'normalizr'

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

const Schemas = {
    USER: userSchema,
    ACCOUNT: accountSchema,
    ACCOUNTS: arrayOf(accountSchema),
    POST: postSchema,
    POSTS: arrayOf(postSchema)
};

export default Schemas;