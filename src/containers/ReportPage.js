import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

// const loadData = ({user, loadPosts}) => {
//     loadPosts(user.username);
// };

class ReportPage extends Component {
    static propTypes = {
        // Injected by React Redux

        // Injected by React Router
        children: PropTypes.node,
    };

    // componentWillMount() {
    //     loadData(this.props)
    // }



    render() {
        return (
            <div>
                Report
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

export default connect(mapStateToProps, {
    // loadPosts
})(ReportPage)
