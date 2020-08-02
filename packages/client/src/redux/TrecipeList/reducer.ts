import { TrecipeListAction } from './action';
import { initialState, TrecipeListActionTypes, TrecipeListState } from './types';
import Trecipe from '../../../../shared/models/trecipe';

export function trecipeListReducer(
    state = initialState,
    action: TrecipeListAction
): TrecipeListState {
    switch (action.type) {
        case TrecipeListActionTypes.CREATE_TRECIPE_SUCCESS:
            return {
                ...state,
                myTrecipes: state.myTrecipes.concat(action.payload),
            };
        case TrecipeListActionTypes.DELETE_TRECIPE_SUCCESS:
            return {
                ...state,
                myTrecipes: state.myTrecipes.filter((tc: Trecipe) => tc.uuid !== action.payload),
            };
        case TrecipeListActionTypes.UPDATE_TRECIPE_SUCCESS:
            return {
                ...state,
                myTrecipes: state.myTrecipes.map((tc: Trecipe) => {
                    return tc.uuid === action.payload.id
                        ? { ...tc, ...action.payload.updated }
                        : tc;
                }),
            };
        case TrecipeListActionTypes.FETCH_MY_TRECIPES_SUCCESS:
            return {
                ...state,
                myTrecipes: action.payload.trecipes,
            };
        case TrecipeListActionTypes.FETCH_ASSOCIATED_TRECIPES_SUCCESS:
            return {
                ...state,
                associatedTrecipes: action.payload.trecipes,
            };
        case TrecipeListActionTypes.FETCH_MY_ASSOCIATED_TRECIPES_SUCCESS:
            return {
                ...state,
                myAssociatedTrecipes: action.payload.trecipes,
            };
        default:
            return state;
    }
}
