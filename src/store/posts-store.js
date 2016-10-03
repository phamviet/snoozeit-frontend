import 'isomorphic-fetch'
import Reflux from 'reflux';
import graphQL, {Schemas} from '../lib/graphQL'

import entitiesStore from './entities-store'
import {PostActions} from '../actions/reflux'

const PostsStore = Reflux.createStore({
    init(){
        this.listenTo(PostActions.load, this.load);
        this.listenTo(PostActions.add, this.add);
        this.listenTo(PostActions.remove, this.remove);
    },

    getIds(){
        return Object.keys(entitiesStore.entities.posts);
    },

    add(input, cb = () => {}){
        var self = this;
        var query = `mutation AddPost($input: PostInputType) {
            post: addPost(input: $input) {
                ...postInfo
            }
        }`;

        graphQL(query, {input})
            .then(function (data) {
                entitiesStore.normalizeAndSave(data.post, Schemas.POST);
                self.trigger();
                cb();
            });
    },

    load () {
        var self = this;
        graphQL('query { user: me{ posts{...postInfo} } }')
            .then(function (data) {
                entitiesStore.normalizeAndSave(data.user.posts, Schemas.POSTS);
                self.trigger();
            });
    },

    remove(id){
        entitiesStore.removePost(id, this.trigger);
    },
});

export default PostsStore;
