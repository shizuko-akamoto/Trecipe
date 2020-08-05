import { SearchResultModel } from '../../../../shared/models/searchResult';

export type SearchResultState = {
    result: SearchResultModel | undefined;
};

export const initialState: SearchResultState = {
    result: undefined,
};

export enum SearchResultActionTypes {
    LOAD_SEARCH_RESULTS = '@searchResult/LOAD_SEARCH_RESULT',
}
