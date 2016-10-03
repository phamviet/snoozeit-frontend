import React, {Component, PropTypes} from 'react'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

class AccountConnectorForm extends Component {
    constructor() {
        super();
        this.renderAccount = this.renderAccount.bind(this);
    }

    // not_authorized callback
    onConnected(status, response) {
        console.log('connected');

    }

    renderAccount(account) {
        const tooltip = (
            <Tooltip id="tooltip">Connect to {account.getType()}</Tooltip>
        );

        const onClick = () => account.handleConnectClick(this.onConnected);
        return (
            <Col key={account.account_type} className={account.colClasses} onClick={onClick}>
                <div className="text-center">
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        {account.icon({size: '6x', className: 'account__icon'})}
                    </OverlayTrigger>
                </div>
            </Col>
        )
    }

    render() {
        return (
            <form>
                <Row>
                    {this.props.accounts.map(this.renderAccount)}
                </Row>
            </form>
        )
    }
}

AccountConnectorForm.propTypes = {
    accounts: PropTypes.array.isRequired,
};

export default AccountConnectorForm
