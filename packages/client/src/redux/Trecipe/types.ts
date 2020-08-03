import Trecipe from '../../../../shared/models/trecipe';

export type TrecipeState = {
    trecipe: Trecipe | undefined;
};

export const initialState: TrecipeState = {
    trecipe: undefined,
};

export enum TrecipeActionCategory {
    LOAD_TRECIPE = '@trecipe/LOAD_TRECIPE',
    UPDATE_TRECIPE = '@trecipe/UPDATE_TRECIPE',
}

export enum TrecipeActionTypes {
    LOAD_TRECIPE_REQUEST = '@trecipe/LOAD_TRECIPE_REQUEST',
    UPDATE_TRECIPE_REQUEST = '@trecipe/UPDATE_TRECIPE_REQUEST',

    LOAD_TRECIPE_SUCCESS = '@trecipe/LOAD_TRECIPE_SUCCESS',
    UPDATE_TRECIPE_SUCCESS = '@trecipe/UPDATE_TRECIPE_SUCCESS',

    LOAD_TRECIPE_FAILURE = '@trecipe/LOAD_TRECIPE_FAILURE',
    UPDATE_TRECIPE_FAILURE = '@trecipe/UPDATE_TRECIPE_FAILURE',
}
