import { typedAction, AppThunk } from '../util';
import { UserActionTypes } from './types';
import { Action } from 'redux';
import { User, UserResponse, CreateUserDTO, LoginDTO } from '../../../../shared/models/user';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '..';
import UserService from '../../services/userService';
import { AxiosError } from 'axios';

export const login = (userData: LoginDTO): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        UserService.login(userData)
            .then((response: UserResponse) => {
                dispatch(setAuthenticated(response.isAuthenticated));
                dispatch(setUser(response.user));
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(setError(err.response.data.errors));
                }
            });
    };
};

export const signup = (userData: CreateUserDTO): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
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
                }
            });
    };
};

export const logout = (cb?: () => void): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        UserService.logout()
            .then((response: UserResponse) => {
                dispatch(setAuthenticated(response.isAuthenticated));
                dispatch(setUser({}));
                if (cb) cb();
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    dispatch(setError(err.response.data.errors));
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
    return typedAction(UserActionTypes.SET_ERROR, data);
};

export const setUser = (data: Partial<User>) => {
    return typedAction(UserActionTypes.SET_USER, data);
};

export const setLoading = (data: boolean) => {
    return typedAction(UserActionTypes.SET_LOADING, data);
};

export const setAuthenticated = (data: boolean) => {
    return typedAction(UserActionTypes.SET_AUTH, data);
};

export type UserAction = ReturnType<
    typeof setError | typeof setUser | typeof setLoading | typeof setAuthenticated
>;
