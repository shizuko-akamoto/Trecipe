import React, { MouseEvent } from 'react';
import './login.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StaticContext } from 'react-router';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { RootState } from '../../redux';
import { signup, login } from '../../redux/User/action';
import { LoginDTO, CreateUserDTO } from '../../../../shared/models/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLoadingSelector } from '../../redux/Loading/selector';
import { UserActionCategory } from '../../redux/User/types';
import OverlaySpinner from '../../components/Loading/OverlaySpinner';

type RouteWithStateProps = RouteComponentProps<{}, StaticContext, { from: { pathname: string } }>;

type ErrorIconProps = {
    active: boolean;
};

// Tiny functional component for displaying error icon
function ErrorIcon(props: ErrorIconProps) {
    return (
        <div className={`error-icon-wrapper${props.active ? ' active' : ''}`}>
            <div className="error-icon">
                <FontAwesomeIcon icon={'exclamation-triangle'} color="red" fixedWidth />
            </div>
        </div>
    );
}

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
        const user: LoginDTO = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.login(user);
    };

    private createAccount = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const newUser: CreateUserDTO = {
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

    render() {
        // Return the user back to the page before login
        const { from } = this.props.location.state || { from: { pathname: '/mytrecipes' } };
        if (this.props.user.isAuthenticated) {
            return <Redirect to={from} />;
        }

        // Check for errors in response
        let errors = {
            usernameError: false,
            displayNameError: false,
            emailError: false,
            passwordError: false,
            credentialError: false,
            dupUsernameError: false,
            dupEmailError: false,
        };
        if (this.props.user.errors) {
            this.props.user.errors.forEach((error) => {
                switch (error.path) {
                    case '.body.email':
                        errors.emailError = true;
                        break;
                    case '.body.password':
                        errors.passwordError = true;
                        break;
                    case '.body.username':
                        errors.usernameError = true;
                        break;
                    case '.body.displayName':
                        errors.displayNameError = true;
                        break;
                    default:
                        break;
                }
                switch (error.message) {
                    case 'Email or password is incorrect':
                        errors.credentialError = true;
                        break;
                    case 'Username already existed':
                        errors.dupUsernameError = true;
                        break;
                    case 'Email already existed':
                        errors.dupEmailError = true;
                        break;
                    default:
                        break;
                }
            });
        }

        const loginPasswordError = errors.credentialError || errors.passwordError;
        const signupUsernameError = errors.usernameError || errors.dupUsernameError;
        const signupEmailError = errors.emailError || errors.dupEmailError;

        return (
            <div className="login-wrapper">
                <div className="login-window">
                    <div className="login-nav">
                        <ul>
                            <li
                                className={`${this.state.signup ? '' : 'active'}`}
                                id="login"
                                onClick={() => this.toggleLogin(true)}>
                                Login
                            </li>
                            <li
                                className={`nav-right ${this.state.signup ? 'active' : ''}`}
                                id="signup"
                                onClick={() => this.toggleLogin(false)}>
                                Sign up
                            </li>
                        </ul>
                    </div>
                    <div className="form">
                        <form
                            className={`form-login ${this.state.signup ? '' : 'active'}`}
                            action="">
                            <label htmlFor="login-email">Email</label>
                            <input
                                type="text"
                                name="login-email"
                                id="login-email"
                                placeholder="Enter your email here"
                                value={this.state.email ? this.state.email : ''}
                                onChange={this.handleEmailChange}
                                className={errors.emailError ? 'input-error' : ''}
                            />
                            <ErrorIcon active={errors.emailError} />
                            <div className={`error${errors.emailError ? ' active' : ''}`}>
                                Incorrect email format
                            </div>

                            <label htmlFor="login-password">Password</label>
                            <input
                                type="password"
                                name="login-password"
                                id="login-password"
                                placeholder="Enter your password here"
                                value={this.state.password ? this.state.password : ''}
                                onChange={this.handlePasswordChange}
                                maxLength={64}
                                className={loginPasswordError ? 'input-error' : ''}
                            />
                            <ErrorIcon active={loginPasswordError} />
                            <div className={`error${loginPasswordError ? ' active' : ''}`}>
                                Incorrect email or password
                            </div>

                            <button onClick={this.login}>Login</button>
                        </form>
                        <form
                            className={`form-signup ${this.state.signup ? 'active' : ''}`}
                            action="">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username here"
                                value={this.state.username ? this.state.username : ''}
                                onChange={this.handleUsernameChange}
                                maxLength={64}
                                className={signupUsernameError ? 'input-error' : ''}
                            />
                            <ErrorIcon active={signupUsernameError} />
                            <div className={`error${signupUsernameError ? ' active' : ''}`}>
                                {errors.usernameError
                                    ? 'May only contain alphanumericals'
                                    : 'Username already existed'}
                            </div>

                            <label htmlFor="name">Display name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your display name here"
                                value={this.state.displayName ? this.state.displayName : ''}
                                onChange={this.handleDisplayNameChange}
                                className={errors.displayNameError ? 'input-error' : ''}
                            />
                            <ErrorIcon active={errors.displayNameError} />
                            <div className={`error${errors.displayNameError ? ' active' : ''}`}>
                                Minimum 1 character
                            </div>

                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter your email here"
                                value={this.state.email ? this.state.email : ''}
                                onChange={this.handleEmailChange}
                                className={signupEmailError ? 'input-error' : ''}
                            />
                            <ErrorIcon active={signupEmailError} />
                            <div className={`error${signupEmailError ? ' active' : ''}`}>
                                {errors.emailError
                                    ? 'Incorrect email format'
                                    : 'Email already existed'}
                            </div>

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password here"
                                value={this.state.password ? this.state.password : ''}
                                onChange={this.handlePasswordChange}
                                maxLength={64}
                                className={errors.passwordError ? 'input-error' : ''}
                            />
                            <ErrorIcon active={errors.passwordError} />
                            <div className={`error${errors.passwordError ? ' active' : ''}`}>
                                Minimum 8 characters
                            </div>

                            <button onClick={this.createAccount}>Sign up</button>
                        </form>
                    </div>
                    {this.props.isLoading && <OverlaySpinner size={50} />}
                </div>
            </div>
        );
    }
}

// when user sign up / sign in
const loadingSelector = createLoadingSelector([UserActionCategory.SET_USER]);

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    isLoading: loadingSelector(state),
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
