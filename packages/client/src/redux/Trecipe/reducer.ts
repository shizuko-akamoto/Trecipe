import { initialState, TrecipeActionTypes, TrecipeState } from './types';
import { TrecipeAction } from './action';

export function trecipeReducer(state = initialState, action: TrecipeAction): TrecipeState {
    switch (action.type) {
        case TrecipeActionTypes.FETCH_TRECIPE_SUCCESS:
            return {
                trecipe: action.payload,
            };
        case TrecipeActionTypes.UPDATE_TRECIPE_SUCCESS:
            if (state.trecipe && state.trecipe.uuid === action.payload.uuid) {
                return { trecipe: action.payload };
            } else {
                return state;
            }
        default:
            return state;
    }
}
