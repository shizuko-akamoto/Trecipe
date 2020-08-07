import { typedAction, AppThunk } from '../util';
import { UserActionTypes } from './types';
import { Action } from 'redux';
import { User, UserResponse, CreateUserDTO, LoginDTO } from '../../../../shared/models/user';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '..';
import UserService from '../../services/userService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const login = (userData: LoginDTO): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: UserActionTypes.SET_USER_REQUEST });
        UserService.login(userData)
            .then((response: UserResponse) => {
                dispatch(setAuthenticated(response.isAuthenticated));
                dispatch(setUser(response.user));
                toast.info('Login successful!');
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(setError(err.response.data.errors));
                    dispatch(
                        typedAction(UserActionTypes.SET_USER_FAILURE, {
                            reason: err.toString(),
                        })
                    );
                    toast(`Failed to login [${err.toString()}]`, { type: toast.TYPE.ERROR });
                }
            });
    };
};

export const signup = (userData: CreateUserDTO): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: UserActionTypes.SET_USER_REQUEST });
        UserService.signup(userData)
            .then(() => {
                dispatch(
                    login({
                        email: userData.email,
                        password: userData.password,
                    })
                );
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(setError(err.response.data.errors));
                    dispatch(
                        typedAction(UserActionTypes.SET_USER_FAILURE, {
                            reason: err.toString(),
                        })
                    );
                    toast(`Failed to sign up [${err.toString()}]`, { type: toast.TYPE.ERROR });
                }
            });
    };
};

export const logout = (callback?: () => void): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        UserService.logout()
            .then((response: UserResponse) => {
                dispatch(setAuthenticated(response.isAuthenticated));
                dispatch(setUser({}));
                toast.info(`Successfully logged out!`);
                if (callback) callback();
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(setError(err.response.data.errors));
                    toast(`Failed to logout [${err.toString()}]`, { type: toast.TYPE.ERROR });
                }
            });
    };
};

export const getUser = () => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        UserService.getUser()
            .then((response: UserResponse) => {
                dispatch(setAuthenticated(response.isAuthenticated));
                dispatch(setUser(response.user));
                dispatch(setLoading(false));
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(setError(err.response.data.errors));
                }
                dispatch(setLoading(false));
            });
    };
};

export const setError = (data: Array<any>) => {
    return typedAction(UserActionTypes.SET_ERROR_SUCCESS, data);
};

export const setUser = (data: Partial<User>) => {
    return typedAction(UserActionTypes.SET_USER_SUCCESS, data);
};

export const setLoading = (data: boolean) => {
    return typedAction(UserActionTypes.SET_LOADING_SUCCESS, data);
};

export const setAuthenticated = (data: boolean) => {
    return typedAction(UserActionTypes.SET_AUTH_SUCCESS, data);
};

export type UserAction = ReturnType<
    typeof setError | typeof setUser | typeof setLoading | typeof setAuthenticated
>;
