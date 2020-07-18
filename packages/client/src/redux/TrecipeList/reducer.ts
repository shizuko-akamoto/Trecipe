import { TrecipeListAction } from './action';
import { initialState, TrecipeListActionTypes, TrecipeListState } from './types';
import Trecipe from '../../../../shared/models/trecipe';

export function trecipeListReducer(
    state = initialState,
    action: TrecipeListAction
): TrecipeListState {
    switch (action.type) {
        case TrecipeListActionTypes.ADD_TRECIPE:
            return {
                trecipes: state.trecipes.concat(action.payload),
            };
        case TrecipeListActionTypes.DELETE_TRECIPE:
            return {
                trecipes: state.trecipes.filter((tc: Trecipe) => tc.uuid !== action.payload),
            };
        case TrecipeListActionTypes.UPDATE_TRECIPE:
            return {
                trecipes: state.trecipes.map((tc: Trecipe) => {
                    return tc.uuid === action.payload.id
                        ? { ...tc, ...action.payload.updated }
                        : tc;
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
