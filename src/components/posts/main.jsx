import React, {Component, PropTypes} from 'react'


import withViewer from '../../lib/withViewer'
// import viewerStore from '../../store/viewer-store'
import PostForm from './post-form'
import PostsNavigation from './posts-navigation'
import PostList from './post-list'

class PostsMain extends Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div>
                <PostForm user={this.props.viewer}/>
                <PostsNavigation/>
                <PostList user={this.props.viewer}/>
            </div>
        )
    }
}

export default withViewer(PostsMain)
