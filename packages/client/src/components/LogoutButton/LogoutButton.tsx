import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button } from '../../components/Button/Button';
import { RootState } from '../../redux';
import { logout } from '../../redux/User/action';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// TODO: remove this file if this is not needed for responsive design

type LogoutButtonProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteComponentProps;

class LogoutButton extends React.Component<LogoutButtonProps> {
    private login = () => {
        this.props.logout(() => {
            this.props.history.push('/');
        });
    };

    render() {
        return <Button text="Logout" onClick={this.login.bind(this)} />;
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            logout,
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutButton));
