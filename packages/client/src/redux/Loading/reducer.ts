import { initialState, LoadingState } from './types';

export function loadingReducer(state = initialState, action: any): LoadingState {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    // action does not need loading, so we ignore them
    if (!matches) {
        return state;
    }

    const [, requestName, requestState] = matches;
    return {
        ...state,
        // set loading state for that action to true if 'REQEUST', false otherwise
        [requestName]: requestState === 'REQUEST',
    };
}
