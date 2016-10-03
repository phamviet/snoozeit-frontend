import React , {PropTypes} from 'react';
// import {Link} from 'react-router'

const Message = ({post, author}) => {
    const {name} = author;
    const {content, createdAt} = post;

    return (
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-8">
                <p>{content}</p>
                <p>
                    <small className="text-muted">{createdAt} by {name}</small>
                </p>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
};

Message.propTypes = {
    post: PropTypes.shape({
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};


export default Message;