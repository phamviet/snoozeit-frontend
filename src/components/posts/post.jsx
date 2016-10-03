import React, {Component, PropTypes} from 'react'
import moment from 'moment-timezone'
import omit from 'lodash/omit'
import Panel from 'react-bootstrap/lib/Panel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import {PostActions} from '../../actions/reflux'

import PostControls from './post-controls'
import './post.css'

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.uuid = props.post.uuid;
        this.trashPost = this.trashPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    updatePostStatus() {

    }

    publishPost() {
        this.updatePostStatus('publish');
    }

    restorePost() {
        this.updatePostStatus('restore');
    }

    deletePost() {
        PostActions.remove(this.uuid);
        // this.updatePostStatus('delete');
    }

    trashPost() {
        PostActions.remove(this.uuid);
        // this.updatePostStatus('trash');
    }

    renderRelativeDate(post) {
        return (
            <small className="post-relative-time text-muted">
                <Glyphicon
                    glyph="time"
                    className="post-relative-time__icon"/>

                <span className="post-relative-time__text">
                    { moment(new Date(post.created_at)).fromNow() }
                </span>
		    </small>
        );
    }

    render() {
        const {post: {content}} = this.props;

        const controls = <PostControls { ...omit(this.props, 'children')}
                                       onPublish={ this.publishPost }
                                       onTrash={ this.trashPost }
                                       onDelete={ this.deletePost }
                                       onRestore={ this.restorePost }/>;

        return (
            <Panel className="Post" footer={controls}>
                <div>
                    {content}
                </div>
                <div className="pull-right">
                    {this.renderRelativeDate(this.props.post)}
                </div>
            </Panel>

        )
    }
}

export default Post
