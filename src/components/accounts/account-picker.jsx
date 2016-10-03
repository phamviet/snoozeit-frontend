import React, {Component, PropTypes} from 'react'

import without from 'lodash/without'
import Image from 'react-bootstrap/lib/Image'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

class AccountPicker extends Component {
    static propTypes = {
        accounts: PropTypes.array.isRequired,
        selected: PropTypes.array,
        onSelected: PropTypes.func,
    };

    static defaultProps = {
        selected: [],
        onSelected: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selected: nextProps.selected});
    }

    handleSelect(uuid) {
        let {selected} = this.state;

        if (selected.includes(uuid)) {
            selected = without(selected, uuid);
        } else {
            selected.push(uuid)
        }

        this.props.onSelected(selected);
        this.setState({selected: selected});
    }

    renderItem(account) {
        const {selected} = this.state;

        return (
            <NavItem key={account.uuid} eventKey={account.uuid} active={selected.includes(account.uuid)}  onSelect={this.handleSelect}>
                <Image src={account.picture()} circle/>
            </NavItem>
        )
    }

    render() {
        return (
            <Nav bsStyle="pills" className="account-picker">
                {this.props.accounts.map(this.renderItem)}
            </Nav>
        )
    }
}

export default AccountPicker
