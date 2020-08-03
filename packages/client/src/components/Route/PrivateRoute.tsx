import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import Spinner from '../Loading/Spinner';

type PrivateRouteProps = ReturnType<typeof mapStateToProps> & RouteProps;

class PrivateRoute extends React.Component<PrivateRouteProps> {
    render() {
        let { component: Component, authenticated, loading, ...rest } = this.props;
        return (
            /**
             * Display spinner while checking if user is authenticated
             * If user is logged in, display the protected route/component
             * If not, redirect user back to the login page
             */
            loading ? (
                <Spinner positionStyle="static" />
            ) : (
                <Route
                    {...rest}
                    render={(props) =>
                        authenticated && Component ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/user/login',
                                    state: { from: props.location },
                                }}
                            />
                        )
                    }
                />
            )
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        authenticated: state.user.isAuthenticated,
        loading: state.user.loading,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
