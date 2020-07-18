import Trecipe from '../../../../shared/models/trecipe';

/**
 * TrecipeListState
 */
export type TrecipeListState = {
    trecipes: Array<Trecipe>;
};

export const initialState: TrecipeListState = { trecipes: [] };

export enum TrecipeListActionTypes {
    ADD_TRECIPE = '@trecipeList/ADD_TRECIPE',
    DELETE_TRECIPE = '@trecipeList/DELETE_TRECIPE',
    UPDATE_TRECIPE = '@trecipeList/UPDATE_TRECIPE',
    LOAD_TRECIPE = '@trecipeList/LOAD_TRECIPE',
}
