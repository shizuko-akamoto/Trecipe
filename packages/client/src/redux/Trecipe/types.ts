import Trecipe from '../../../../shared/models/trecipe';

export type TrecipeState = {
    trecipe: Trecipe | undefined;
};

export const initialState: TrecipeState = {
    trecipe: undefined,
};

export enum TrecipeActionCategory {
    FETCH_TRECIPE = '@trecipe/FETCH_TRECIPE',
    UPDATE_TRECIPE = '@trecipe/UPDATE_TRECIPE',
}

export enum TrecipeActionTypes {
    FETCH_TRECIPE_REQUEST = '@trecipe/FETCH_TRECIPE_REQUEST',
    UPDATE_TRECIPE_REQUEST = '@trecipe/UPDATE_TRECIPE_REQUEST',

    FETCH_TRECIPE_SUCCESS = '@trecipe/FETCH_TRECIPE_SUCCESS',
    UPDATE_TRECIPE_SUCCESS = '@trecipe/UPDATE_TRECIPE_SUCCESS',

    FETCH_TRECIPE_FAILURE = '@trecipe/FETCH_TRECIPE_FAILURE',
    UPDATE_TRECIPE_FAILURE = '@trecipe/UPDATE_TRECIPE_FAILURE',
}
