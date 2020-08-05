import { initialState, SearchResultActionTypes, SearchResultState } from './types';
import { SearchResultAction } from './action';

export function searchResultReducer(
    state = initialState,
    action: SearchResultAction
): SearchResultState {
    switch (action.type) {
        case SearchResultActionTypes.LOAD_SEARCH_RESULTS_SUCCESS:
            return {
                result: action.payload,
            };
        default:
            return state;
    }
}
