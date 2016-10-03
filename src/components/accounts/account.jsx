import React, {Component, PropTypes} from 'react'
// import moment from 'moment-timezone'

import Image from 'react-bootstrap/lib/Image'
import Media from 'react-bootstrap/lib/Media'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

class Account extends Component {

    render() {
        const {account} = this.props;

        return (
            <ListGroupItem listItem={true} className="account">
                <Media>
                    <Media.Left align="middle">
                        <Image src={account.picture()} circle />
                    </Media.Left>
                    <Media.Body>
                    </Media.Body>
                </Media>
            </ListGroupItem>
        )
    }
}

Account.propTypes = {
    account: PropTypes.object.isRequired,
};

export default Account
