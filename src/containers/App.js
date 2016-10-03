import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {resetErrorMessage} from '../actions'

class App extends Component {
    static propTypes = {
        // Injected by React Redux
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired,

        // Injected by React Router
        children: PropTypes.node,
    };

    handleDismissClick = e => {
        this.props.resetErrorMessage();
        e.preventDefault()
    };

    renderErrorMessage() {
        const {errorMessage} = this.props;
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{backgroundColor: '#e99', padding: 10}}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                Dismiss
            </a> )
            </p>
        )
    }

    render() {
        return (
            <div>
                { this.renderErrorMessage() }
                { this.props.children }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    errorMessage: state.errorMessage,
});

export default connect(mapStateToProps, {
    resetErrorMessage,
})(App)
