import Destination from '../../../../shared/models/destination';

/**
 * DestinationsState
 */
export type DestinationsState = {
    destsByTrecipeId: Map<string, Array<Destination>>;
    dests: Array<Destination>;
};

export const initialState = {
    destsByTrecipeId: new Map<string, Array<Destination>>(),
    dests: [] as Array<Destination>,
};

export enum DestinationsActionCategory {
    FETCH_DESTS_BY_TRECIPE_ID = '@destination/FETCH_DESTS_BY_TRECIPE_ID',
    ADD_DESTINATION = '@destination/ADD_DESTINATION',
    REMOVE_DESTINATION = '@destination/REMOVE_DESTINATION',
    FETCH_DESTINATION_PLACE_ID = '@destination/FETCH_DESTINATION_PLACE_ID',
    UPDATE_DESTINATION = '@destination/UPDATE_DESTINATION',
}
export enum DestinationsActionTypes {
    FETCH_DESTS_BY_TRECIPE_ID_SUCCESS = '@destination/FETCH_DESTS_BY_TRECIPE_ID_SUCCESS',
    ADD_DESTINATION_SUCCESS = '@destination/ADD_DESTINATION_SUCCESS',
    REMOVE_DESTINATION_SUCCESS = '@destination/REMOVE_DESTINATION_SUCCESS',
    FETCH_DESTINATION_BY_PLACE_ID_SUCCESS = '@destination/FETCH_DESTINATION_BY_PLACE_ID_SUCCESS',
    UPDATE_DESTINATION_SUCCESS = '@destination/UPDATE_DESTINATION_SUCCESS',

    FETCH_DESTS_BY_TRECIPE_ID_FAILURE = '@destination/FETCH_DESTS_BY_TRECIPE_ID_FAILURE',
    ADD_DESTINATION_FAILURE = '@destination/ADD_DESTINATION_FAILURE',
    REMOVE_DESTINATION_FAILURE = '@destination/REMOVE_DESTINATION_FAILURE',
    FETCH_DESTINATION_BY_PLACE_ID_FAILURE = '@destination/FETCH_DESTINATION_PLACE_ID_FAILURE',
    UPDATE_DESTINATION_FAILURE = '@destination/UPDATE_DESTINATION_FAILURE',

    FETCH_DESTS_BY_TRECIPE_ID_REQUEST = '@destination/FETCH_DESTS_BY_TRECIPE_ID_REQUEST',
    ADD_DESTINATION_REQUEST = '@destination/ADD_DESTINATION_REQUEST',
    REMOVE_DESTINATION_REQUEST = '@destination/REMOVE_DESTINATION_REQUEST',
    FETCH_DESTINATION_BY_PLACE_ID_REQUEST = '@destination/FETCH_DESTINATION_PLACE_ID_REQUEST',
    UPDATE_DESTINATION_REQUEST = '@destination/UPDATE_DESTINATION_REQUEST',
}
