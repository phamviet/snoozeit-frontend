import Reflux from 'reflux';

const Actions = Reflux.createActions([
    'initialize',
    'openModal',
    'closeModal',
    'openComposer',
    'closeComposer',
]);


export const AccountActions = Reflux.createActions([
    'add',
    'load',
]);

export const PostActions = Reflux.createActions([
    'add',
    'remove',
    'load',
]);

export default Actions