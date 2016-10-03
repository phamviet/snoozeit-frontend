import React, {Component, PropTypes} from 'react'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class PostControls extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    };

    render() {
        const {post, onTrash} = this.props;

        const controls = [];
        function addControl(props) {
            // eslint-disable-next-line
            const {href, onClick, text, icon} = props;
            controls.push(
                <NavItem key={icon} onClick={onClick}>
                    <Glyphicon glyph={icon} /> {text}
                </NavItem>
            )
        }

        if (!post.published_at) {
            addControl({
                text: 'Publish',
                icon: 'globe',
            });
        }

        addControl({
            text: 'Edit',
            icon: 'edit',
        });

        addControl({
            text: 'Trash',
            icon: 'trash',
            onClick: onTrash
        });


        return (
            <Nav justified activeKey={1}>
                { controls }
            </Nav>
        )
    }
}

export default PostControls
