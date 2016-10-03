import React, {Component} from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    emailChange(e) {
        this.setState({
            email: e.target.value
        });
    };

    passwordChange(e) {
        this.setState({
            password: e.target.value
        });
    };

    handLogin = e => {
        e.preventDefault();
    };

    render() {
        return (
            <Modal {...this.props} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">New Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Message</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="textarea"/>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button bsStyle="primary" onClick={this.props.onHide}>Publish</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Editor;