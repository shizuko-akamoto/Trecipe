import { initialState } from './types';

export function errorReducer(state = initialState, action: any) {
    const { type, payload } = action;
    const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state,
        // Store error reason
        // e.g. stores error reason when receiving FETCH_TRECIPE_FAILURE
        //      else clear error reason when receiving FETCH_TRECIPE_REQUEST
        [requestName]: requestState === 'FAILURE' ? payload.reason : '',
    };
}
