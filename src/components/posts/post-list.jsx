import React, {Component, PropTypes} from 'react'

// import List from '../list'
import Post from './post'

import entitiesStore from '../../store/entities-store';
import postsStore from '../../store/posts-store';
import {PostActions} from '../../actions/reflux'

class PostList extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };

        this.onDataReady = this.onDataReady.bind(this);
    }

    componentWillMount() {
        this.unsubscribe = postsStore.listen(this.onDataReady);
        PostActions.load();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataReady() {
        this.setState({ items: postsStore.getIds()})
    }

    renderPost(uuid) {
        const post = entitiesStore.getPost(uuid);
        return (
            <Post key={uuid} post={post}/>
        )
    }

    render() {
        return (
            <div>
                {this.state.items.map(this.renderPost)}
            </div>
        )
    }
}

export default PostList