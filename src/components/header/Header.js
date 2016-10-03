import React from 'react';
import {Link} from 'react-router'
import Navbar from 'react-bootstrap/lib/Navbar'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export default ({openEditor, closeEditor}) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link className="navbar-brand" to="/">
                    Snooze
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullRight>
            <Button type="submit" onClick={openEditor}>
                <Glyphicon glyph="plus"/> New
            </Button>
        </Navbar.Form>
    </Navbar>
);