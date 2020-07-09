import { TrecipeListAction } from './action';
import { initialState, TrecipeListActionTypes, TrecipeListState, TrecipeModel } from './types';

export function trecipeListReducer(
    state = initialState,
    action: TrecipeListAction
): TrecipeListState {
    switch (action.type) {
        case TrecipeListActionTypes.CREATE_NEW_TRECIPE:
            return {
                trecipes: state.trecipes.concat(action.payload),
            };
        case TrecipeListActionTypes.DELETE_TRECIPE:
            return {
                trecipes: state.trecipes.filter((tc: TrecipeModel) => tc.id !== action.payload),
            };
        case TrecipeListActionTypes.UPDATE_TRECIPE:
            return {
                trecipes: state.trecipes.map((tc: TrecipeModel) => {
                    return tc.id === action.payload.id ? { ...tc, ...action.payload.updated } : tc;
                }),
            };
        case TrecipeListActionTypes.LOAD_TRECIPE:
            return {
                trecipes: action.payload.trecipes,
            };
        default:
            return state;
    }
}
