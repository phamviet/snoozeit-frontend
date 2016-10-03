import Reflux from 'reflux';
import React from 'react';
import ReactDOM from 'react-dom';
import Actions from '../actions/reflux'
import Modal from '../components/modal';

const CONTAINER_ID = "app-modal-container";

function createContainer(id) {
    const element = document.createElement(id);
    document.body.appendChild(element);
    return element;
}


const ModalStore = Reflux.createStore({
    init(containerId = CONTAINER_ID){
        this.isOpen = false;
        this.container = createContainer(containerId);
        ReactDOM.render(<span />, this.container);

        this.listenTo(Actions.openModal, this.openModal);
        this.listenTo(Actions.closeModal, this.closeModal);
    },

    isModalOpen() {
        return this.isOpen;
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
    renderModal (child, props, callback) {
        this.modal = (
            <Modal {...props} show={true} onHide={this.onHide.bind(this)}>{child}</Modal>
        );

        ReactDOM.render(this.modal, this.container, () => {
            this.isOpen = true;
            this.trigger();
            callback();
        });
    },
    openModal (component, props, callback = () => { }){
        if (this.isOpen) {
            throw new Error('There is already an opened modal')
        }

        this.renderModal(component, props, callback);
    },
    closeModal (){
        this.onHide()
    },
});

export default ModalStore;
