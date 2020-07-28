import Trecipe from '../../../../shared/models/trecipe';

/**
 * TrecipeListState
 */
export type TrecipeListState = {
    myTrecipes: Array<Trecipe>;
    associatedTrecipes: Array<Trecipe>;
    myAssociatedTrecipes: Array<Trecipe>;
};

export const initialState: TrecipeListState = {
    myTrecipes: [],
    associatedTrecipes: [],
    myAssociatedTrecipes: [],
};

export enum TrecipeListActionTypes {
    ADD_TRECIPE = '@trecipeList/ADD_TRECIPE',
    DELETE_TRECIPE = '@trecipeList/DELETE_TRECIPE',
    UPDATE_TRECIPE = '@trecipeList/UPDATE_TRECIPE',
    LOAD_TRECIPE = '@trecipeList/LOAD_TRECIPE',
    LOAD_ASSOCIATED_TRECIPE = '@trecipeList/LOAD_ASSOCIATED_TRECIPE',
    LOAD_MY_ASSOCIATED_TRECIPE = '@trecipeList/LOAD_MY_ASSOCIATED_TRECIPE',
}
