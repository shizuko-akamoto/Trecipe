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

export enum UserActionTypes {
    SET_USER = '@user/SET_USER',
    SET_AUTH = '@user/SET_AUTH',
    SET_LOADING = '@user/SET_LOADING',
    SET_ERROR = '@user/SET_ERROR',
}
