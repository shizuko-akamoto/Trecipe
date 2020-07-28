import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { logout } from '../../redux/User/action';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CardMenu } from '../CardMenu/CardMenu';
import './avatar.scss';

type AvatarProps = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

class Avatar extends React.Component<AvatarProps> {
    private logout = () => {
        this.props.logout(() => {
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <div className="avatar-wrapper">
                <CardMenu
                    icon={['far', 'user-circle']}
                    buttonSize={1.5}
                    menuHeight={2.0}
                    menuItems={[
                        {
                            id: 1,
                            text: 'Log out',
                            icon: 'sign-out-alt',
                            onClick: () => {
                                this.logout();
                            },
                        },
                    ]}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            logout,
        },
        dispatch
    );
};

export default withRouter(connect(null, mapDispatchToProps)(Avatar));
