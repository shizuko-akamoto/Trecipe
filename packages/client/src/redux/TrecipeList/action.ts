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
import { toast } from 'react-toastify';

export const createTrecipe = (newTrecipe: Trecipe) => {
    return typedAction(TrecipeListActionTypes.CREATE_TRECIPE_SUCCESS, newTrecipe);
};

export const deleteTrecipe = (idToDelete: string) => {
    return typedAction(TrecipeListActionTypes.DELETE_TRECIPE_SUCCESS, idToDelete);
};

export const updateTrecipe = (idToUpdate: string, updatedTC: Partial<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.UPDATE_TRECIPE_SUCCESS, {
        id: idToUpdate,
        updated: updatedTC,
    });
};

export const fetchMyTrecipes = (trecipes: Array<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.FETCH_MY_TRECIPES_SUCCESS, {
        trecipes: trecipes,
    });
};

export const fetchAssociatedTrecipes = (trecipes: Array<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.FETCH_ASSOCIATED_TRECIPES_SUCCESS, {
        trecipes: trecipes,
    });
};

export const fetchMyAssociatedTrecipes = (trecipes: Array<Trecipe>) => {
    return typedAction(TrecipeListActionTypes.FETCH_MY_ASSOCIATED_TRECIPES_SUCCESS, {
        trecipes: trecipes,
    });
};

/**----- Sends trecipe requests to server and dispatches trecipe actions with results -----**/

export const fetchMyTrecipesRequest = (): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.FETCH_MY_TRECIPES_REQUEST });
        TrecipeService.fetchMyTrecipes()
            .then((trecipes: Array<Trecipe>) => {
                dispatch(fetchMyTrecipes(trecipes));
            })
            .catch((err) => {
                dispatch({ type: TrecipeListActionTypes.FETCH_MY_TRECIPES_FAILURE, payload: err });
            });
    };
};

export const createTrecipeRequest = (trecipeData: CreateNewTrecipeDTO): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.CREATE_TRECIPE_REQUEST });
        TrecipeService.createTrecipe(trecipeData).then((createdTrecipe: Trecipe) => {
            dispatch(createTrecipe(createdTrecipe));
            toast(`${createdTrecipe.name} created successfully!`, {
                type: toast.TYPE.INFO,
            });
            UserService.getUser().then((updatedUser: UserResponse) => {
                dispatch(setUser(updatedUser.user));
            });
        });
    };
};

export const duplicateTrecipeRequest = (srcTrecipeId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.CREATE_TRECIPE_REQUEST });
        TrecipeService.duplicateTrecipe(srcTrecipeId).then((copiedTrecipe: Trecipe) => {
            dispatch(createTrecipe(copiedTrecipe));
            toast(`${copiedTrecipe.name} created successfully!`, {
                type: toast.TYPE.INFO,
            });
            UserService.getUser().then((updatedUser: UserResponse) => {
                dispatch(setUser(updatedUser.user));
            });
        });
    };
};

export const deleteTrecipeRequest = (idToDelete: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.DELETE_TRECIPE_REQUEST });
        TrecipeService.deleteTrecipe(idToDelete).then((deletedCount: number) => {
            if (deletedCount > 0) {
                dispatch(deleteTrecipe(idToDelete));
                toast(`Trecipe deleted successfully!`, {
                    type: toast.TYPE.INFO,
                });
                UserService.getUser().then((updatedUser: UserResponse) => {
                    dispatch(setUser(updatedUser.user));
                });
            }
        });
    };
};

export const fetchAssociatedTrecipesRequest = (placeId: string, limit?: number): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.FETCH_ASSOCIATED_TRECIPES_REQUEST });
        TrecipeService.fetchAssociatedTrecipes(placeId, limit).then((trecipes: Array<Trecipe>) => {
            dispatch(fetchAssociatedTrecipes(trecipes));
        });
    };
};

export const fetchMyAssociatedTrecipesRequest = (placeId: string, limit?: number): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: TrecipeListActionTypes.FETCH_MY_ASSOCIATED_TRECIPES_REQUEST });
        TrecipeService.fetchAssociatedTrecipes(placeId, limit, true).then(
            (trecipes: Array<Trecipe>) => {
                dispatch(fetchMyAssociatedTrecipes(trecipes));
            }
        );
    };
};

export type TrecipeListAction = ReturnType<
    | typeof createTrecipe
    | typeof deleteTrecipe
    | typeof updateTrecipe
    | typeof fetchMyTrecipes
    | typeof fetchAssociatedTrecipes
    | typeof fetchMyAssociatedTrecipes
>;
