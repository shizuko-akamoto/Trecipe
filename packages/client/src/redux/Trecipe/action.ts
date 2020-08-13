import Trecipe from '../../../../shared/models/trecipe';
import { AppThunk, typedAction } from '../util';
import { TrecipeActionTypes } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { Action } from 'redux';
import TrecipeService from '../../services/trecipeService';
import { getDestinationsByTrecipeId } from '../Destinations/action';
import { updateTrecipe as updateTrecipeInList } from '../TrecipeList/action';
import { TrecipeListActionTypes } from '../TrecipeList/types';
import { toast } from 'react-toastify';

export const fetchTrecipe = (trecipe: Trecipe) => {
    return typedAction(TrecipeActionTypes.FETCH_TRECIPE_SUCCESS, trecipe);
};

export const updateTrecipe = (trecipe: Trecipe) => {
    return typedAction(TrecipeActionTypes.UPDATE_TRECIPE_SUCCESS, trecipe);
};

/**----- Sends trecipe requests to server and dispatches trecipe actions with results -----**/

export const fetchTrecipeRequest = (id: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch(typedAction(TrecipeActionTypes.FETCH_TRECIPE_REQUEST));
        TrecipeService.getTrecipe(id)
            .then((trecipe: Trecipe) => {
                dispatch(fetchTrecipe(trecipe));
            })
            .catch((err) => {
                dispatch(
                    typedAction(TrecipeActionTypes.FETCH_TRECIPE_FAILURE, {
                        reason: err.toString(),
                    })
                );
                toast(`Failed to fetch trecipe [${err.toString()}]`, {
                    type: toast.TYPE.ERROR,
                });
            });
    };
};

export const updateTrecipeRequest = (trecipeId: string, updatedTrecipe: Partial<Trecipe>) => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch(typedAction(TrecipeListActionTypes.UPDATE_TRECIPE_REQUEST));
        dispatch(typedAction(TrecipeActionTypes.UPDATE_TRECIPE_REQUEST));
        TrecipeService.updateTrecipe(trecipeId, updatedTrecipe)
            .then((updated: Trecipe) => {
                dispatch(updateTrecipe(updated));
                dispatch(updateTrecipeInList(trecipeId, updated));
                // if change included destinations, refresh desitnations for this trecipe as well
                if (updatedTrecipe.destinations) {
                    dispatch(getDestinationsByTrecipeId(trecipeId));
                }
            })
            .catch((err) => {
                dispatch(
                    typedAction(TrecipeActionTypes.UPDATE_TRECIPE_FAILURE, {
                        reason: err.toString(),
                    })
                );
                toast(`Failed to update trecipe [${err.toString()}]`, {
                    type: toast.TYPE.ERROR,
                });
            });
    };
};

export type TrecipeAction = ReturnType<typeof fetchTrecipe | typeof updateTrecipe>;
