import { AppThunk, typedAction } from '../util';
import { SearchResultActionTypes } from './types';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { SearchResultModel } from '../../../../shared/models/searchResult';
import searchService from '../../services/searchService';
import { toast } from 'react-toastify';

export const loadResult = (results: SearchResultModel) => {
    return typedAction(SearchResultActionTypes.LOAD_SEARCH_RESULTS_SUCCESS, results);
};

/**----- Sends search requests to server and dispatches search actions with results -----**/

export const fetchResultRequest = (searchKey: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch(typedAction(SearchResultActionTypes.LOAD_SEARCH_RESULTS_REQUEST));
        searchService
            .performSearch(searchKey, 0)
            .then((results: SearchResultModel) => {
                dispatch(loadResult(results));
            })
            .catch((err) => {
                toast.error(`Failed to fetch search results [${err.toString()}`);
                dispatch(
                    typedAction(SearchResultActionTypes.LOAD_SEARCH_RESULTS_FAILURE, {
                        reason: err.toString(),
                    })
                );
            });
    };
};

export type SearchResultAction = ReturnType<typeof loadResult>;
