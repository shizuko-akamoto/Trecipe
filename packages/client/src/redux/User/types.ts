import { User } from '../../../../shared/models/user';

export type UserState = {
    user: Partial<User>;
    isAuthenticated: boolean;
};

export const initialState: UserState = {
    user: {},
    isAuthenticated: false,
};

export enum UserActionCategory {
    SET_AUTH = '@user/SET_AUTH',
}

export enum UserActionTypes {
    SET_AUTH_REQUEST = '@user/SET_AUTH_REQUEST',
    SET_AUTH_SUCCESS = '@user/SET_AUTH_SUCCESS',
    SET_AUTH_FAILURE = '@user/SET_AUTH_FAILURE',
    SET_USER = '@user/SET_USER',
}
