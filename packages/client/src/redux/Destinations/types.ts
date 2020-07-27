import Destination from '../../../../shared/models/destination';

/**
 * DestinationsState
 */
export type DestinationsState = {
    destsByTrecipeId: Map<string, Array<Destination>>;
};

export const initialState = {
    destsByTrecipeId: new Map<string, Array<Destination>>(),
};

export enum DestinationsActionTypes {
    LOAD_DESTS_BY_TRECIPE_ID = '@destination/LOAD_DESTS_BY_TRECIPE_ID',
    ADD_DESTINATION = '@destination/ADD_DESTINATION',
    REMOVE_DESTINATION = '@destination/REMOVE_DESTINATION',
    UPDATE_DESTINATION = '@destination/UPDATE_DESTINATION',
}
