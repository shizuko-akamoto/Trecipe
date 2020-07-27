import { AppThunk, typedAction } from '../util';
import { TrecipeListActionTypes } from './types';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import TrecipeService from '../../services/trecipeService';
import Trecipe from '../../../../shared/models/trecipe';
import CreateNewTrecipeDTO from '../../../../shared/models/createNewTrecipeDTO';

export const addTrecipe = (newTrecipe: Trecipe) => {
    return typedAction(TrecipeListActionTypes.ADD_TRECIPE, newTrecipe);
};

export const deleteTrecipe = (idToDelete: string) => {
    return typedAction(TrecipeListActionTypes.DELETE_TRECIPE, idToDelete);
};

export const updateTrecipe = (idToUpdate: string, updatedTC: Partial<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.UPDATE_TRECIPE, {
        id: idToUpdate,
        updated: updatedTC,
    });
};

export const loadTrecipes = (trecipes: Array<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.LOAD_TRECIPE, {
        trecipes: trecipes,
    });
};

export const loadAssociatedTrecipes = (trecipes: Array<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.LOAD_ASSOCIATED_TRECIPE, {
        trecipes: trecipes,
    });
};

/**----- Sends trecipe requests to server and dispatches trecipe actions with results -----**/

export const fetchAllTrecipes = (): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.fetchAllTrecipes().then((trecipes: Array<Trecipe>) => {
            dispatch(loadTrecipes(trecipes));
        });
    };
};

export const createTrecipeRequest = (trecipeData: CreateNewTrecipeDTO): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.createTrecipe(trecipeData).then((createdTrecipe: Trecipe) => {
            dispatch(addTrecipe(createdTrecipe));
        });
    };
};

export const duplicateTrecipeRequest = (srcTrecipeId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.duplicateTrecipe(srcTrecipeId).then((copiedTrecipe: Trecipe) => {
            dispatch(addTrecipe(copiedTrecipe));
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

export const fetchAssociatedTrecipesRequest = (placeId: string, limit?: number): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.fetchAssociatedTrecipes(placeId, limit).then((trecipes: Array<Trecipe>) => {
            dispatch(loadAssociatedTrecipes(trecipes));
        });
    };
};

export type TrecipeListAction = ReturnType<
    | typeof addTrecipe
    | typeof deleteTrecipe
    | typeof updateTrecipe
    | typeof loadTrecipes
    | typeof loadAssociatedTrecipes
>;
