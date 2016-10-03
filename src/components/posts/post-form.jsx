import React, {Component, PropTypes} from 'react'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
// import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import AccountPicker from '../accounts/account-picker'
import {PostActions} from '../../actions/reflux'

class PostForm extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        post: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            related_accounts: [],
            draft: false,
            content: '',
        };

        this.onSelectAccount = this.onSelectAccount.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    getDefaultState() {
        return {
            related_accounts: [],
            draft: false,
            content: '',
        }
    }

    onSelectAccount(ids) {
        this.setState({related_accounts: ids})
    }

    onContentChange(e) {
        this.setState({content: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        PostActions.add(this.state, this.reset);
    }

    reset() {
        this.setState(this.getDefaultState())
    }

    render() {
        const {user} = this.props;
        const {related_accounts, content} = this.state;
        const valid = related_accounts.length && content.length;

        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Message</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="" value={content} onChange={this.onContentChange} />
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <AccountPicker accounts={user.getAccounts()} selected={related_accounts} onSelected={this.onSelectAccount} />
                </FormGroup>

                <FormGroup>
                    <Button type="submit" disabled={!valid} bsStyle="primary">
                        Publish
                    </Button>
                </FormGroup>
            </form>
        )
    }
}

export default PostForm
