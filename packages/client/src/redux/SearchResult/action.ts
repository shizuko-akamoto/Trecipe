import { AppThunk, typedAction } from '../util';
import { SearchResultActionTypes } from './types';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { SearchResultModel } from '../../../../shared/models/searchResult';
import searchService from '../../services/searchService';

export const loadResult = (results: SearchResultModel) => {
    return typedAction(SearchResultActionTypes.LOAD_SEARCH_RESULTS, results);
};

export const fetchResultRequest = (searchKey: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        searchService.performSearch(searchKey, 0).then((results: SearchResultModel) => {
            dispatch(loadResult(results));
        });
    };
};

export type SearchResultAction = ReturnType<typeof loadResult>;
