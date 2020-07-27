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
                ...state,
                myTrecipes: state.myTrecipes.concat(action.payload),
            };
        case TrecipeListActionTypes.DELETE_TRECIPE:
            return {
                ...state,
                myTrecipes: state.myTrecipes.filter((tc: Trecipe) => tc.uuid !== action.payload),
            };
        case TrecipeListActionTypes.UPDATE_TRECIPE:
            return {
                ...state,
                myTrecipes: state.myTrecipes.map((tc: Trecipe) => {
                    return tc.uuid === action.payload.id
                        ? { ...tc, ...action.payload.updated }
                        : tc;
                }),
            };
        case TrecipeListActionTypes.LOAD_TRECIPE:
            return {
                ...state,
                myTrecipes: action.payload.trecipes,
            };
        case TrecipeListActionTypes.LOAD_ASSOCIATED_TRECIPE:
            return {
                ...state,
                associatedTrecipes: action.payload.trecipes,
            };
        default:
            return state;
    }
}
