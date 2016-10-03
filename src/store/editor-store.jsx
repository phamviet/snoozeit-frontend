import Reflux from 'reflux';
import React from 'react';
import ReactDOM from 'react-dom';
import Actions from '../actions/reflux'

import Modal from '../components/modal';
import PostForm from '../components/posts/post-form';

const CONTAINER_ID = "app-composer-container";

function createContainer(id) {
    const element = document.createElement(id);
    document.body.appendChild(element);
    return element;
}


const EditorStore = Reflux.createStore({
    init(containerId = CONTAINER_ID){
        this.isOpen = false;
        this.container = createContainer(containerId);
        ReactDOM.render(<span />, this.container);

        this.listenTo(Actions.openComposer, this.openComposer);
        this.listenTo(Actions.closeComposer, this.closeComposer);
    },


    onHide() {
        if (this.isOpen) {
            ReactDOM.render(React.cloneElement(this.modal, {show: false}), this.container, () => {
                this.isOpen = false;
                this.modal = null;
                this.trigger();
            });
        }
    },
    renderComposer (post, props, callback) {

        props = Object.assign({}, {title: 'New Message'}, props);
        this.modal = (
            <Modal {...props} show={true} onHide={this.onHide.bind(this)}>
                <PostForm post={post}/>
            </Modal>
        );

        ReactDOM.render(this.modal, this.container, () => {
            this.isOpen = true;
            this.trigger();
            callback();
        });
    },
    openComposer (post, props, callback = () => { }){
        if (this.isOpen) {
            throw new Error('There is already a composer opened')
        }

        this.renderComposer(post, props, callback);
    },
    closeComposer (){
        this.onHide()
    },
});

export default EditorStore;
