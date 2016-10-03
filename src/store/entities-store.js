import merge from 'lodash/merge';
import Reflux from 'reflux';
import {normalize} from 'normalizr'
import graphQL, {Schemas} from '../lib/graphQL'

import PostsStore from './posts-store'
import Account from '../models/Account';
import User from '../models/User';
import Post from '../models/Post';

const EntitiesStore = Reflux.createStore({
    init(){
        this.entities = {
            accounts: {},
            users: {},
            posts: {},
        };
    },

    get(){
        return this.entities
    },

    normalizeAndSave(data, schema){
        const normalized = normalize(data, schema);
        merge(this.entities, normalized.entities);
    },

    getAccount(uuid){
        const data = this.entities.accounts[uuid];
        if (data) {
            return new Account(data);
        }
    },
    getUser(uuid){
        const data = this.entities.users[uuid];
        if (data) {
            return new User(data);
        }
    },
    getPost(uuid){
        const data = this.entities.posts[uuid];
        if (data) {
            return new Post(data);
        }
    },
    getInitialState() {
        return this.entities;
    },

    removeEntity(id, type) {
        delete this.entities[type][id]
    },

    removePost(id) {
        var self = this;
        var query = `mutation RemovePost($id: ID!) {
            post: removePost(id: $id) {
                ...postInfo
            }
        }`;
        graphQL(query, {id})
            .then(function (data) {
                if (data.post) {
                    self.removeEntity(id, 'posts');
                    PostsStore.trigger();
                }
            });
    },

    initialize (trigger) {
        var self = this;
        graphQL('query{ me { ...userInfo, accounts {...accountInfo} } }')
            .then(function (data) {
                const normalized = normalize(data.me, Schemas.USER);
                merge(self.entities, normalized.entities);
                trigger(normalized.result);
            });
    }
});

export default EntitiesStore;
