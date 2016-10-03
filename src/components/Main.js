import React, {Component, PropTypes} from 'react';
import './Main.css';

import Header from './header';
import Sidebar from './sidebar';

class Main extends Component {
    static propTypes = {
        // Injected by React Redux
        onLogout: PropTypes.func.isRequired,
        children: PropTypes.node,
    };


    render() {
        const {onLogout} = this.props;
        // if (!me.authenticated) {
        //     return <Welcome/>
        // }
        return (
            <div className="App">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar onLogout={onLogout}/>
                        </div>
                        <div className="col-md-9">
                            {this.props.children}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
