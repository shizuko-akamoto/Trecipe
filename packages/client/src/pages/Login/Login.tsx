import React, { MouseEvent } from 'react';
import './login.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
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

    private login = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.login(user);
    };

    private createAccount = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            displayName: this.state.displayName,
        };
        this.props.signup(newUser);
    };
    private toggleLogin = (isLogin: boolean) => {
        this.setState({ signup: !isLogin });
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

        // TODO cleanup
        let usernameError = false;
        let emailError = false;
        let passwordError = false;
        let credentialError = false;
        this.props.user.errors.forEach(error => {
            // TODO switch
            if (error.path === ".body.email") {
                emailError = true;
            } else if (error.path === ".body.password") {
                passwordError = true;
            } else if (error.path === ".body.username") {
                usernameError = true;
            } else if (error.message === "Email or password is incorrect") {
                credentialError = true;
            }
        })

        return (
            <div className="login-wrapper">
                <div className="login-window">
                    <div className="login-nav">
                        <ul>
                            <li className={`${this.state.signup? "" : "active"}`} id="login" onClick={() => this.toggleLogin(true)}>Login</li>
                            <li className={`nav-left ${this.state.signup? "active" : ""}`} id="signup" onClick={() => this.toggleLogin(false)}>Sign up</li>
                        </ul>
                    </div>
                    <div className="form">
                        <form className={`form-login ${this.state.signup? "" : "active"}`} action="">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" 
                                value={this.state.email ? this.state.email : ''} 
                                onChange={this.handleEmailChange}
                                className={emailError? "input-error" : ""}
                                />
                            {/* TODO cleanup this ugly error */}
                            <div className={`error${emailError? " active" : ""}`}>Incorrect email format</div>

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" 
                                value={this.state.password ? this.state.password : ''}
                                onChange={this.handlePasswordChange}
                                className={credentialError || passwordError ? "input-error" : ""}
                                />
                            <div className={`error${credentialError || passwordError ? " active" : ""}`}>Incorrect credential</div>
                            
                            <button onClick={this.login}>Login</button>
                        </form>
                        <form className={`form-signup ${this.state.signup? "active" : ""}`} action="">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" 
                                value={this.state.username ? this.state.username : ''}
                                onChange={this.handleUsernameChange}
                                className={usernameError? "input-error" : ""}
                                />
                            <div className={`error${usernameError? " active" : ""}`}>May only contain alphanumericals</div>

                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" 
                                value={this.state.displayName ? this.state.displayName : ''}
                                onChange={this.handleDisplayNameChange}
                                />

                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" 
                                value={this.state.email ? this.state.email : ''} 
                                onChange={this.handleEmailChange}
                                className={emailError? "input-error" : ""}
                                />
                            <div className={`error${emailError? " active" : ""}`}>Incorrect email format</div>

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" 
                                value={this.state.password ? this.state.password : ''}
                                onChange={this.handlePasswordChange}
                                className={passwordError? "input-error" : ""}
                                />
                            <div className={`error${passwordError? " active" : ""}`}>Minimum 8 characters</div>

                            <button onClick={this.createAccount}>Sign up</button>
                        </form>
                    </div>
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
