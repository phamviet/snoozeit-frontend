import 'isomorphic-fetch'
import Reflux from 'reflux';
import entitiesStore from './entities-store'
import Actions from '../actions/reflux'

const ViewerStore = Reflux.createStore({
    init(){
        this.user = null;
        this.listenTo(Actions.initialize, this.initialize);
        this.onInitialized = this.onInitialized.bind(this);
    },

    initialize(){
        entitiesStore.initialize(this.onInitialized);
    },

    onInitialized(uuid){
        this.user = entitiesStore.getUser(uuid);
        this.trigger();
    },

    getUser() {
        return this.user;
    },

    isAuthenticated() {
        return !!this.user;
    },
});

export default ViewerStore;
