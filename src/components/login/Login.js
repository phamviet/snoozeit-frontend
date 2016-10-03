import React, {Component, PropTypes} from 'react';
import './login.css'
import Panel from 'react-bootstrap/lib/Panel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'

class Login extends Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    isValidEmail() {
        const email = this.state.email;
        return email && /\S+@\S+\.\S+/.test(email);
    }

    emailChange(e) {
        this.setState({ email: e.target.value});
    }

    passwordChange(e) {
        this.setState({ password: e.target.value, disabled: !this.isValidEmail() || !e.target.value});
    }

    handLogin = e => {
        e.preventDefault();
        this.props.onLogin(this.state, (err, data) => {
            this.setState({ error: err});
        });
    }

    render() {
        const {password, email} = this.state;
        const isValidEmail = this.isValidEmail();
        const disabled = !(isValidEmail && password);
        const validationState = email && !isValidEmail ? 'warning' : null;

        let warning;
        if (this.state.error) {
            warning = (
                <Alert bsStyle="danger">
                    <p>{this.state.error}</p>
                </Alert>
            )
        }
        return (
            <div className="login container">
                <Panel>
                    {warning}
                    <form onSubmit={this.handLogin}>
                        <FormGroup controlId="email" validationState={validationState}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" placeholder="Email" onChange={this.emailChange}/>
                        </FormGroup>
                        <FormGroup controlId="email">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" onChange={this.passwordChange}/>
                        </FormGroup>
                        <Button type="submit" disabled={disabled} bsStyle="primary">
                            Sign in
                        </Button>
                    </form>
                </Panel>
            </div>
        )
    }
}

export default Login;