import React, {PropTypes} from 'react'
import hoistStatics from 'hoist-non-react-statics'
import viewerStore from '../store/viewer-store'

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withViewer(WrappedComponent) {

    const WithViewer = React.createClass({
        propTypes: {viewer: PropTypes.object},

        render() {
            const viewer = viewerStore.getUser()
            const props = {...this.props, viewer}

            return <WrappedComponent {...props} />
        }
    });

    WithViewer.displayName = `withViewer(${getDisplayName(WrappedComponent)})`
    WithViewer.WrappedComponent = WrappedComponent;

    return hoistStatics(WithViewer, WrappedComponent)
}