import React from 'react'
import Model from './Model'
import FontAwesome from '../lib/Fontawesome'
import capitalize from 'react-bootstrap/lib/utils/capitalize'
import {AccountActions} from '../actions/reflux'

class Account extends Model {
    constructor(obj) {
        super(obj);
        this._type = this.account_type.split('_')[0];

    }
    getAssociatedTypeAttrs() {
        let icon;
        let color;
        let picture;
        switch (this._type) {
            case 'FACEBOOK':
                icon = 'facebook-official';
                color = '#355089';
                picture = `http://graph.facebook.com/v2.7/${this.account_identifier}/picture`;
                break;

            case 'GOOGLE':
                icon = 'google-plus';
                color = '#DD4B39';
                break;

            case 'TWITTER':
                icon = 'twitter';
                color = '#1DA1F3';
                break;

            default:
        }

        return {icon, color, picture}
    }

    icon(props) {
        const {icon, color} = this.getAssociatedTypeAttrs();
        return (
            <FontAwesome icon={icon} {...props} style={{color}}/>
        )
    }

    picture() {
        const {picture} = this.getAssociatedTypeAttrs();
        return picture
    }

    getType() {
        return capitalize(this._type.toLowerCase())
    }

    handleConnectClick() {
        const method = `handle${this.getType()}ConnectClick`;
        Account.prototype[method].apply(this, arguments);
    }

    handleFacebookConnectClick(cb = ()=>{}){
        window.FB.login( (response) => {
            if (response.status === 'connected') {
                AccountActions.add({
                    account_type: this.account_type,
                    account_identifier: response.authResponse.userID,
                    access_token: response.authResponse.accessToken,
                });

            } else if (response.status === 'not_authorized') {
                cb(response.status, response);
            } else {
                cb('Error', response);
            }
        }, {scope: 'email'});
    }

    handleGoogleConnectClick(cb = ()=>{}){
        cb();
    }

    handleTwitterConnectClick(cb = ()=>{}){
        cb();
    }
}

Account.factory = (obj) => new Account(obj);
Account.defaults = () => {
    return [
        Account.factory({account_type: 'FACEBOOK_USER', colClasses: 'col-xs-6 col-md-3 col-md-offset-1'}),
        Account.factory({account_type: 'GOOGLE_USER', colClasses: 'col-xs-6 col-md-4'}),
        Account.factory({account_type: 'TWITTER_USER', colClasses: 'col-xs-6 col-md-3'}),
    ]
};

export default Account