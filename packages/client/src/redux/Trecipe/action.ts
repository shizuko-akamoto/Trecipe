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

export const loadTrecipe = (trecipe: Trecipe) => {
    return typedAction(TrecipeActionTypes.LOAD_TRECIPE, trecipe);
};

export const updateTrecipe = (trecipe: Trecipe) => {
    return typedAction(TrecipeActionTypes.UPDATE_TRECIPE, trecipe);
};

export const fetchTrecipe = (id: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.getTrecipe(id).then((trecipe: Trecipe) => {
            dispatch(loadTrecipe(trecipe));
        });
    };
};

export const updateTrecipeRequest = (trecipeId: string, updatedTrecipe: Partial<Trecipe>) => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.UPDATE_TRECIPE_REQUEST });
        TrecipeService.updateTrecipe(trecipeId, updatedTrecipe).then((updated: Trecipe) => {
            dispatch(loadTrecipe(updated));
            dispatch(updateTrecipeInList(trecipeId, updated));
            if (updatedTrecipe.destinations) {
                dispatch(getDestinationsByTrecipeId(trecipeId));
            }
        });
    };
};

export type TrecipeAction = ReturnType<typeof loadTrecipe | typeof updateTrecipe>;
