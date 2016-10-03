import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import AccountList from './account-list'

class AccountsMain extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,

    };

    render() {
        return (
            <div>
                <AccountList user={this.props.user}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.me,
    }
};

export default connect(mapStateToProps, {
    // loadPosts
})(AccountsMain)
