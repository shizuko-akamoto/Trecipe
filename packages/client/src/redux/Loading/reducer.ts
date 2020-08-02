import { initialState, LoadingState } from './types';

export function loadingReducer(state = initialState, action: any): LoadingState {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if (!matches) {
        return state;
    }

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState === 'REQUEST',
    };
}
