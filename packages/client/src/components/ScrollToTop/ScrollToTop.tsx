import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Reference: https://reactrouter.com/web/guides/scroll-restoration

class ScrollToTop extends React.Component<RouteComponentProps> {
    componentDidUpdate(prevProps: RouteComponentProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);
