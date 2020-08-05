import { SearchResultModel } from '../../../../shared/models/searchResult';

export type SearchResultState = {
    result: SearchResultModel | undefined;
};

export const initialState: SearchResultState = {
    result: undefined,
};

export enum SearchResultActionCategory {
    LOAD_SEARCH_RESULTS = '@searchResult/LOAD_SEARCH_RESULT',
}

export enum SearchResultActionTypes {
    LOAD_SEARCH_RESULTS_REQUEST = '@searchResult/LOAD_SEARCH_RESULT_REQUEST',
    LOAD_SEARCH_RESULTS_FAILURE = '@searchResult/LOAD_SEARCH_RESULT_FAILURE',
    LOAD_SEARCH_RESULTS_SUCCESS = '@searchResult/LOAD_SEARCH_RESULT_SUCCESS',
}
