// import React from 'react'
import Model from './Model'
// import {PostAction} from '../actions/reflux'
import entitiesStore from '../store/entities-store';

class Post extends Model {
    getAuthor() {
        return entitiesStore.getUser(this.author);
    }
}

export default Post