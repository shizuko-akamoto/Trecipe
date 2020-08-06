import { User } from '../../../../shared/models/user';

export type UserState = {
    user: Partial<User>;
    isAuthenticated: boolean;
    loading: boolean;
    errors: Array<any>;
};

export const initialState: UserState = {
    user: {},
    isAuthenticated: false,
    loading: true,
    errors: [],
};

export enum UserActionCategory {
    SET_USER = '@user/SET_USER',
    SET_AUTH = '@user/SET_AUTH',
    SET_LOADING = '@user/SET_LOADING',
    SET_ERROR = '@user/SET_ERROR',
}

export enum UserActionTypes {
    SET_USER_SUCCESS = '@user/SET_USER_SUCCESS',
    SET_AUTH_SUCCESS = '@user/SET_AUTH_SUCCESS',
    SET_LOADING_SUCCESS = '@user/SET_LOADING_SUCCESS',
    SET_ERROR_SUCCESS = '@user/SET_ERROR_SUCCESS',

    SET_USER_REQUEST = '@user/SET_USER_REQUEST',
    SET_AUTH_REQUEST = '@user/SET_AUTH_REQUEST',
    SET_LOADING_REQUEST = '@user/SET_LOADING_REQUEST',
    SET_ERROR_REQUEST = '@user/SET_ERROR_REQUEST',

    SET_USER_FAILURE = '@user/SET_USER_FAILURE',
    SET_AUTH_FAILURE = '@user/SET_AUTH_FAILURE',
    SET_LOADING_FAILURE = '@user/SET_LOADING_FAILURE',
    SET_ERROR_FAILURE = '@user/SET_ERROR_FAILURE',
}
