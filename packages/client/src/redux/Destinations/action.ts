import { DestinationsActionCategory, DestinationsActionTypes } from './types';
import { AppThunk, typedAction } from '../util';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import DestinationService from '../../services/destinationService';
import Destination from '../../../../shared/models/destination';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import {
    fetchAssociatedTrecipesRequest,
    updateTrecipe as updateTrecipeInList,
} from '../TrecipeList/action';
import Trecipe from '../../../../shared/models/trecipe';
import TrecipeService from '../../services/trecipeService';
import { updateTrecipe } from '../Trecipe/action';

/**----- Sends destination requests to server and dispatches destination actions with results -----**/

export const getDestinationsByTrecipeId = (trecipeId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: DestinationsActionTypes.FETCH_DESTS_BY_TRECIPE_ID_REQUEST });
        DestinationService.getDestinationsByTrecipeId(trecipeId).then(
            (dests: Array<Destination>) => {
                dispatch(fetchByTrecipeId(trecipeId, dests));
            }
        );
    };
};

export const getDestinationById = (destId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: DestinationsActionTypes.FETCH_DESTINATION_REQUEST });
        DestinationService.getDestinationById(destId).then((dest: Destination) => {
            dispatch(fetchDestination(dest));
        });
    };
};

export const getDestinationByPlaceId = (placeId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: DestinationsActionTypes.FETCH_DESTINATION_REQUEST });
        DestinationService.getDestinationByPlaceId(placeId).then((dest: Destination) => {
            dispatch(fetchDestination(dest));
        });
    };
};

export const addDestinationRequest = (
    trecipe: Trecipe,
    destData: CreateNewDestinationDTO
): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        const createDestPromise = DestinationService.createDestination(destData);
        const updateTrecipePromise = createDestPromise.then((dest: Destination) => {
            return TrecipeService.updateTrecipe(trecipe.uuid, {
                destinations: [...trecipe.destinations, { destUUID: dest.uuid, completed: false }],
            });
        });

        dispatch(typedAction(DestinationsActionTypes.ADD_DESTINATION_REQUEST));
        return Promise.all([createDestPromise, updateTrecipePromise]).then(
            ([createdDest, updatedTrecipe]: [Destination, Trecipe]) => {
                dispatch(addDestination(trecipe.uuid, createdDest));
                dispatch(updateTrecipe(updatedTrecipe));
                dispatch(fetchAssociatedTrecipesRequest(createdDest.placeId, 10));
            }
        );
    };
};

export const removeDestinationRequest = (
    trecipe: Trecipe,
    idToDelete: { destId?: string; placeId?: string }
): AppThunk => {
    let removeDestPromise: Promise<[string, Trecipe]>;
    if (idToDelete.placeId) {
        // to remove destination by place id, first get corresponding destination uuid, then update trecipe
        removeDestPromise = DestinationService.getDestinationByPlaceId(idToDelete.placeId).then(
            (destToDelete: Destination) => {
                return new Promise(function (resolve, reject) {
                    TrecipeService.updateTrecipe(trecipe.uuid, {
                        destinations: trecipe.destinations.filter(
                            (dest) => dest.destUUID !== destToDelete.uuid
                        ),
                    }).then((updated: Trecipe) => resolve([destToDelete.uuid, updated]));
                });
            }
        );
    } else if (idToDelete.destId) {
        // remove destination by destination uuid
        removeDestPromise = new Promise(function (resolve, reject) {
            TrecipeService.updateTrecipe(trecipe.uuid, {
                destinations: trecipe.destinations.filter(
                    (dest) => dest.destUUID !== idToDelete.destId
                ),
            }).then((updated: Trecipe) => resolve([idToDelete.destId as string, updated]));
        });
    }
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        dispatch({ type: DestinationsActionTypes.REMOVE_DESTINATION_REQUEST });
        removeDestPromise.then(([removedDestId, updated]: [string, Trecipe]) => {
            dispatch(updateTrecipe(updated));
            dispatch(removeDestination(trecipe.uuid, removedDestId));
            if (idToDelete.placeId) {
                dispatch(fetchAssociatedTrecipesRequest(idToDelete.placeId, 10));
            }
        });
    };
};

export const fetchByTrecipeId = (trecipeId: string, destinations: Array<Destination>) => {
    return typedAction(DestinationsActionTypes.FETCH_DESTS_BY_TRECIPE_ID_SUCCESS, {
        trecipeId: trecipeId,
        dests: destinations,
    });
};

export const addDestination = (trecipeId: string, destination: Destination) => {
    return typedAction(DestinationsActionTypes.ADD_DESTINATION_SUCCESS, {
        trecipeId: trecipeId,
        dest: destination,
    });
};

export const removeDestination = (trecipeId: string, destinationId: string) => {
    return typedAction(DestinationsActionTypes.REMOVE_DESTINATION_SUCCESS, {
        trecipeId: trecipeId,
        destinationId: destinationId,
    });
};

export const fetchDestination = (destination: Destination) => {
    return typedAction(DestinationsActionTypes.FETCH_DESTINATION_SUCCESS, {
        dest: destination,
    });
};

export type DestinationsAction = ReturnType<
    | typeof fetchByTrecipeId
    | typeof addDestination
    | typeof removeDestination
    | typeof fetchDestination
>;
