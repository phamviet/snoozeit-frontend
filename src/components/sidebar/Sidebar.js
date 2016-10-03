import React, {PropTypes} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap'

const SideBar = ({onLogout}) => (
    <Nav bsStyle="pills" stacked activeKey={1}>
        <IndexLinkContainer to="/">
            <NavItem>Message</NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/reports">
            <NavItem>Reports</NavItem>
        </LinkContainer>
        <LinkContainer to="/accounts">
            <NavItem>Connect</NavItem>
        </LinkContainer>
        <NavItem  onClick={onLogout}>Logout</NavItem>
    </Nav>
);

SideBar.propTypes = {
    onLogout: PropTypes.func.isRequired
};

export default SideBar;