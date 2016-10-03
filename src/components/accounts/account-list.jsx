import React, {Component, PropTypes} from 'react'

import entitiesStore from '../../store/entities-store';
import accountsStore from '../../store/accounts-store';
import Actions, {AccountActions} from '../../actions/reflux'
import Button from 'react-bootstrap/lib/Button'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import Badge from 'react-bootstrap/lib/Badge'
import Account from './account'
import AccountModel from '../../models/Account'

import AccountConnectorForm from './account-connector-form'
import FontAwesome from '../../lib/Fontawesome'

class AccountList extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };

        // this.renderAccount = this.renderAccount.bind(this);
        this.onDataReady = this.onDataReady.bind(this);
    }

    componentWillMount() {
        this.unsubscribe = accountsStore.listen(this.onDataReady);
        AccountActions.load();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataReady() {
        this.setState({ items: accountsStore.getIds()})
    }

    openAccountConnector() {
        Actions.openModal(<AccountConnectorForm accounts={AccountModel.defaults()}/>, {
            title: 'Connect'
        });

    }

    renderAccount(uuid) {
        const account = entitiesStore.getAccount(uuid);
        return (
            <Account key={uuid} account={account}/>
        )
    }

    render() {

        return (
            <div className="panel panel-default">
                <div className="panel-heading clearfix">
                    <h3 className="panel-title pull-left">
                        CONNECTED ACCOUNTS
                        &nbsp; &nbsp;<Badge>{this.state.items.length}</Badge>
                    </h3>
                    <Button className="pull-right" onClick={this.openAccountConnector}>
                        <FontAwesome icon="plus"/>&nbsp;
                        <FontAwesome icon="user"/>
                    </Button>
                </div>
                <div className="panel-body">
                    <AccountConnectorForm accounts={AccountModel.defaults()}/>
                </div>
                <ListGroup>
                    {this.state.items.map(this.renderAccount)}
                </ListGroup>
            </div>
        )
    }
}

export default AccountList