import React from 'react'
import classNames from 'classnames'

const FontAwesome = ({icon, size = '1x', className, pullLeft = false, pullRight=false, ...props}) => {
    var classes = ['fa', 'fa-' + icon, 'fa-' + size, className];
    classes.push(classNames({
        'fa-pull-left': pullLeft,
        'fa-pull-right': pullRight,
    }));

    return (
        <i className={classes.join(' ')} {...props} aria-hidden="true"/>
    )
};

export default FontAwesome;