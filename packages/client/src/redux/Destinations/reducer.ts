import { DestinationsActionTypes, DestinationsState, initialState } from './types';
import { DestinationsAction } from './action';
import Destination from '../../../../shared/models/destination';

export function destinationsReducer(
    state = initialState,
    action: DestinationsAction
): DestinationsState {
    switch (action.type) {
        case DestinationsActionTypes.FETCH_DESTS_BY_TRECIPE_ID_SUCCESS:
            return {
                ...state,
                destsByTrecipeId: state.destsByTrecipeId.set(
                    action.payload.trecipeId,
                    action.payload.dests
                ),
            };
        case DestinationsActionTypes.ADD_DESTINATION_SUCCESS:
            let prevDests = state.destsByTrecipeId.get(action.payload.trecipeId);
            return {
                ...state,
                destsByTrecipeId: state.destsByTrecipeId.set(
                    action.payload.trecipeId,
                    prevDests ? [...prevDests, action.payload.dest] : []
                ),
            };
        case DestinationsActionTypes.REMOVE_DESTINATION_SUCCESS:
            const dests = state.destsByTrecipeId.get(action.payload.trecipeId);
            const result = dests
                ? dests.filter((dest: Destination) => dest.uuid !== action.payload.destinationId)
                : [];
            return {
                ...state,
                destsByTrecipeId: state.destsByTrecipeId.set(action.payload.trecipeId, result),
            };
        case DestinationsActionTypes.FETCH_DESTINATION_BY_PLACE_ID_SUCCESS:
            return {
                ...state,
                dests: state.dests.concat(action.payload.dest),
            };
        case DestinationsActionTypes.UPDATE_DESTINATION_SUCCESS:
            let updateDests = state.destsByTrecipeId.get(action.payload.trecipeId);
            const updateResult = updateDests
                ? updateDests.map((dest: Destination) =>
                      dest.uuid === action.payload.destination.uuid
                          ? action.payload.destination
                          : dest
                  )
                : [];
            return {
                ...state,
                destsByTrecipeId: state.destsByTrecipeId.set(
                    action.payload.trecipeId,
                    updateResult
                ),
            };
        default:
            return state;
    }
}
