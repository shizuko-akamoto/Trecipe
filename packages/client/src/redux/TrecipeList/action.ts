import { AppThunk, typedAction } from '../util';
import { TrecipeListActionTypes, TrecipeModel } from './types';
import TrecipeService from '../../services/trecipeService';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

/**----- Trecipe actions -----**/

export const addTrecipe = (newTrecipe: TrecipeModel) => {
    return typedAction(TrecipeListActionTypes.ADD_TRECIPE, newTrecipe);
};

export const deleteTrecipe = (idToDelete: string) => {
    return typedAction(TrecipeListActionTypes.DELETE_TRECIPE, idToDelete);
};

export const updateTrecipe = (idToUpdate: string, updatedTC: Partial<TrecipeModel>) => {
    return typedAction(TrecipeListActionTypes.UPDATE_TRECIPE, {
        id: idToUpdate,
        updated: updatedTC,
    });
};

export const loadTrecipes = (trecipes: Array<TrecipeModel>) => {
    return typedAction(TrecipeListActionTypes.LOAD_TRECIPE, {
        trecipes: trecipes,
    });
};

/**----- Sends trecipe requests to server and dispatches trecipe actions with results -----**/

export const fetchAllTrecipes = (): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.fetchAllTrecipes().then((trecipes: Array<TrecipeModel>) => {
            dispatch(loadTrecipes(trecipes));
        });
    };
};

export const createTrecipeRequest = (trecipeData: Partial<TrecipeModel>): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.createTrecipe(trecipeData).then((createdTrecipe: TrecipeModel) => {
            dispatch(addTrecipe(createdTrecipe));
        });
    };
};

export const deleteTrecipeRequest = (idToDelete: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.deleteTrecipe(idToDelete).then((deletedCount: number) => {
            if (deletedCount > 0) {
                dispatch(deleteTrecipe(idToDelete));
            }
        });
    };
};

export const updateTrecipeRequest = (
    idToUpdate: string,
    updatedTrecipe: Partial<TrecipeModel>
): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.updateTrecipe(idToUpdate, updatedTrecipe).then((updated: TrecipeModel) => {
            dispatch(updateTrecipe(idToUpdate, updated));
        });
    };
};

export type TrecipeListAction = ReturnType<
    typeof addTrecipe | typeof deleteTrecipe | typeof updateTrecipe | typeof loadTrecipes
>;
