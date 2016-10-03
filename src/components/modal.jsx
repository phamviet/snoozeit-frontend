import sortBy from 'lodash/sortBy'
import React, {Component, PropTypes} from 'react';
import Modal  from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

class AppModal extends Component {
    static propTypes = {
        title: PropTypes.node,
        submitLabel: PropTypes.string,
        onHide: PropTypes.func,
        onEntered: PropTypes.func,
        onSubmit: PropTypes.func,
        footer: PropTypes.node,
        children: PropTypes.node,
    };

    constructor() {
        super();
        this.onEntered = this.onEntered.bind(this);
    }

    _focusImportantElement = (target) => {
        const focusable = target.querySelectorAll("[tabIndex], input, textarea");
        const matches = sortBy(focusable, (node) => {
            if (node.tabIndex > 0) {
                return node.tabIndex;
            } else if (node.nodeName === "INPUT") {
                return 1000000
            }
            return 1000001
        });

        if (matches[0]) {
            matches[0].focus();
        }
    };

    onEntered(target) {
        this._focusImportantElement(target);
        if (this.props.onEntered) {
            this.props.onEntered();
        }
    }

    render() {
        const {children, footer, title, onHide, onSubmit, submitLabel, ...props} = this.props;
        let onSubmitWrapper;
        if (onSubmit) {
            onSubmitWrapper = () => {
                onSubmit(onHide)
            }
        } else {
            onSubmitWrapper = onHide;
        }

        Object.assign(props, {onHide, onEntered: this.onEntered});

        return (
            <Modal { ...props } backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-lg">
                {title ?
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{title}</Modal.Title>
                    </Modal.Header> : ''
                }

                <Modal.Body>
                    {children}
                </Modal.Body>

                {footer ? footer : (
                    <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                        <Button bsStyle="primary" onClick={onSubmitWrapper}>{submitLabel || "Submit"}</Button>
                    </Modal.Footer>
                )}
            </Modal>
        )
    }
}

export default AppModal;