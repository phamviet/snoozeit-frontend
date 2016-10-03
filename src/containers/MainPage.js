import React, {Component} from 'react'
import { withRouter } from 'react-router'

import Actions from '../actions/reflux'
import viewerStore from '../store/viewer-store'

import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Welcome from '../components/Welcome';


// Register stores
// eslint-disable-next-line
require('../store/modal-store');
require('../store/editor-store');

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        };

        this.onInitialized = this.onInitialized.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.openEditor = this.openEditor.bind(this);
    }

    componentWillMount() {
        this.unsubscribe = viewerStore.listen(this.onInitialized);
        Actions.initialize();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onInitialized () {
        if (viewerStore.isAuthenticated()) {
            this.setState({initialized: true})
        } else {
            this.props.router.push('/login');
        }
    }

    openEditor () {
        Actions.openComposer();
    }

    handleLogout (e) {
        e.preventDefault();
        // this.props.logout();
    }

    render() {
        if (!this.state.initialized) {
            return (<Welcome/>)
        }

        return (
            <div className="app">
                <Header openEditor={this.openEditor}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar onLogout={this.handleLogout}/>
                        </div>
                        <div className="col-md-9">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MainPage)
