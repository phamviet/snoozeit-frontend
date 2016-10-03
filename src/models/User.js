// import React from 'react'
import Model from './Model'
import entitiesStore from '../store/entities-store';
// import {AccountAction} from '../actions/reflux'

class User extends Model {
    // constructor(obj) {
    //     super(obj);
    //
    // }

    getAccounts() {
        return this.accounts.map(entitiesStore.getAccount);
    }
}

export default User