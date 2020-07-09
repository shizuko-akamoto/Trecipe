import {
    DestinationsActionTypes,
    DestinationsState,
    initialState,
    DestinationModel,
} from './types';
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
        case DestinationsActionTypes.ADD_DESTINATION:
            let prevDests = state.destsByTrecipeId.get(action.payload.trecipeId);
            return {
                destsByTrecipeId: state.destsByTrecipeId.set(
                    action.payload.trecipeId,
                    prevDests ? [...prevDests, action.payload.dest] : []
                ),
            };
        case DestinationsActionTypes.REMOVE_DESTINATION:
            const dests = state.destsByTrecipeId.get(action.payload.trecipeId);
            const result = dests
                ? dests.filter((dest: DestinationModel) => dest.id !== action.payload.destinationId)
                : [];
            return {
                destsByTrecipeId: state.destsByTrecipeId.set(action.payload.trecipeId, result),
            };
        default:
            return state;
    }
}
