import { AppThunk, typedAction } from '../util';
import { TrecipeListActionTypes } from './types';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import TrecipeService from '../../services/trecipeService';
import Trecipe from '../../../../shared/models/trecipe';
import CreateNewTrecipeDTO from '../../../../shared/models/createNewTrecipeDTO';
import UserService from '../../services/userService';
import { UserResponse } from '../../../../shared/models/user';
import { setUser } from '../User/action';

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
            UserService.getUser().then((updatedUser: UserResponse) => {
                dispatch(setUser(updatedUser.user));
            });
        });
    };
};

export const duplicateTrecipeRequest = (srcTrecipeId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.duplicateTrecipe(srcTrecipeId).then((copiedTrecipe: Trecipe) => {
            dispatch(addTrecipe(copiedTrecipe));
            UserService.getUser().then((updatedUser: UserResponse) => {
                dispatch(setUser(updatedUser.user));
            });
        });
    };
};

export const deleteTrecipeRequest = (idToDelete: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.deleteTrecipe(idToDelete).then((deletedCount: number) => {
            if (deletedCount > 0) {
                dispatch(deleteTrecipe(idToDelete));
                UserService.getUser().then((updatedUser: UserResponse) => {
                    dispatch(setUser(updatedUser.user));
                });
            }
        });
    };
};

export type TrecipeListAction = ReturnType<
    typeof addTrecipe | typeof deleteTrecipe | typeof updateTrecipe | typeof loadTrecipes
>;
