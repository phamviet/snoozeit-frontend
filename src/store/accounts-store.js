import 'isomorphic-fetch'
import Reflux from 'reflux';
import graphQL, {Schemas} from '../lib/graphQL'

import entitiesStore from './entities-store'
import {AccountActions} from '../actions/reflux'

const AccountsStore = Reflux.createStore({
    init(){
        this.listenTo(AccountActions.add, this.add);
        this.listenTo(AccountActions.load, this.load);
    },

    getIds(){
        return Object.keys(entitiesStore.entities.accounts);
    },

    onAccount (id) {
        this.id = id;
        this.trigger();
    },

    load () {
        var self = this;
        graphQL('query{ user: me {accounts {...accountInfo} } }')
            .then(function (data) {
                entitiesStore.normalizeAndSave(data.user.accounts, Schemas.ACCOUNTS);
                self.trigger();
            });
    },

    add (input) {
        var self = this;
        var query = `mutation AddAccount($input: AccountInputType) {
            account: addAccount(input: $input) {
                ...accountInfo
            }
        }`;

        graphQL(query, {input})
            .then(function (data) {
                entitiesStore.normalizeAndSave(data.account, Schemas.ACCOUNT);
                self.trigger();
            });
    },
});

export default AccountsStore;
