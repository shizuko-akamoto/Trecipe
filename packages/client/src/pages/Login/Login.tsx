import React from 'react';
import './login.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button } from '../../components/Button/Button';
import { StaticContext } from 'react-router';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RootState } from '../../redux';
import { signup, login } from '../../redux/User/action';

// TODO: this file is placeholder, replace this later

type RouteWithStateProps = RouteComponentProps<{}, StaticContext, { from: { pathname: string } }>;

type LoginProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    RouteWithStateProps;

export interface LoginState {
    email: string;
    password: string;
    username: string;
    displayName: string;
    signup: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
        username: '',
        displayName: '',
        signup: false,
    };

    private handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value });
    };

    private handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value });
    };

    private handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value });
    };

    private handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ displayName: e.target.value });
    };

    private login = () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.login(user);
    };

    private toggleSignup = () => {
        this.setState({ signup: true });
    };
    private createAccount = () => {
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            displayName: this.state.displayName,
        };
        this.props.signup(newUser);
    };

    private goBack = () => {
        this.setState({ signup: false });
    };

    private getValue = () => {
        if (this.props.user.user) {
            return Object.values(this.props.user.user).map((value) => {
                return <p>{value}</p>;
            });
        }
    };

    render() {
        // Return the user back to the page before login
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.props.user.isAuthenticated) {
            return <Redirect to={from} />;
        }
        return (
            <div className="login-wrapper">
                <div className="login-content">
                    <h1 className="title">{this.state.signup ? 'SIGNUP' : 'LOGIN'}</h1>
                    <input
                        id="email"
                        className="input"
                        maxLength={50}
                        placeholder="Email"
                        value={this.state.email ? this.state.email : ''}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        id="password"
                        type="password"
                        className="input"
                        maxLength={50}
                        placeholder="Password"
                        value={this.state.password ? this.state.password : ''}
                        onChange={this.handlePasswordChange}
                    />
                    {this.state.signup && (
                        <input
                            id="username"
                            type="text"
                            className="input"
                            maxLength={50}
                            placeholder="Username"
                            value={this.state.username ? this.state.username : ''}
                            onChange={this.handleUsernameChange}
                        />
                    )}
                    {this.state.signup && (
                        <input
                            id="displayName"
                            type="text"
                            className="input"
                            maxLength={50}
                            placeholder="Display Name"
                            value={this.state.displayName ? this.state.displayName : ''}
                            onChange={this.handleDisplayNameChange}
                        />
                    )}
                    <div className="login-buttons">
                        {!this.state.signup && <Button text="LOGIN" onClick={this.login} />}
                        {!this.state.signup && <Button text="SIGNUP" onClick={this.toggleSignup} />}
                        {this.state.signup && (
                            <Button text="CREATE ACCOUNT" onClick={this.createAccount} />
                        )}
                        {this.state.signup && <Button text="←" onClick={this.goBack} />}
                    </div>
                    <div>
                        <u>User redux store</u>
                    </div>
                    <div>isAuthenticated: {this.props.user.isAuthenticated.toString()}</div>
                    {this.props.user.errors.length > 0 && (
                        <>
                            <div>Path: {this.props.user.errors[0].path}</div>
                            <div>Error: {this.props.user.errors[0].message}</div>
                        </>
                    )}

                    <div>{this.getValue()}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            signup,
            login,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
