import { DestinationsActionTypes, DestinationsState, initialState } from './types';
import { DestinationsAction } from './action';

export function destinationsReducer(
    state = initialState,
    action: DestinationsAction
): DestinationsState {
    switch (action.type) {
        case DestinationsActionTypes.LOAD_DESTS_BY_TRECIPE_ID:
            return {
                destsByTrecipeId: state.destsByTrecipeId.set(
                    action.payload.trecipeId,
                    action.payload.dests
                ),
            };
        default:
            return state;
    }
}
