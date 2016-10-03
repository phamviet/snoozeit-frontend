import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';

export default class List extends Component {
    static propTypes = {
        renderItem: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        loadingLabel: PropTypes.string.isRequired,
        pageCount: PropTypes.number,
        isFetching: PropTypes.bool.isRequired,
        nextPageClick: PropTypes.func.isRequired,
        nextPageUrl: PropTypes.string
    };

    static defaultProps = {
        isFetching: true,
        loadingLabel: 'Loading...'
    };

    renderLoadMore() {
        const {isFetching, nextPageClick} = this.props
        return (
            <button style={{fontSize: '150%'}}
                    onClick={nextPageClick}
                    disabled={isFetching}>
                {isFetching ? 'Loading...' : 'Load More'}
            </button>
        )
    }

    render() {

        const {
            isFetching, nextPageUrl, pageCount,
            items, renderItem, loadingLabel, className
        } = this.props;

        const isEmpty = items.length === 0;
        if (isEmpty && isFetching) {
            return <h2><i>{loadingLabel}</i></h2>
        }

        const isLastPage = !nextPageUrl;
        if (isEmpty && isLastPage) {
            return <h1><i>Nothing here!</i></h1>
        }

        return (
            <div className={classNames(className)}>
                {items.map(renderItem)}
                {pageCount > 0 && !isLastPage && this.renderLoadMore()}
            </div>
        )
    }
}
