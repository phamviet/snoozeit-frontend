import React, {Component} from 'react'
import { withRouter } from 'react-router'
import 'isomorphic-fetch'
import Login from '../components/login';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin({email, password}, cb) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            credentials: 'include'
        })
        .then(response => response.json().then(json => ({json, response})))
        .then(({json, response}) => {
            if (!response.ok) {
                cb(json.error);
            } else {
                this.onSuccess();
            }
        }, cb)
            .catch(() => {
                cb('Unexpected error')
            })
    }

    onSuccess() {
        const {location} = this.props;

        if (location.state && location.state.nextPathname) {
            this.props.router.replace(location.state.nextPathname)
        } else {
            this.props.router.replace('/')
        }
    }

    render() {
        return (
            <Login onLogin={this.onLogin}>
                Report
            </Login>
        )
    }
}

export default withRouter(LoginPage)
