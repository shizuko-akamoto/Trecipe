import { UserAction } from './action';
import { initialState, UserActionTypes, UserState } from './types';

export function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case UserActionTypes.SET_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        default:
            return state;
    }
}
