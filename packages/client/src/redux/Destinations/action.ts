import { DestinationsActionTypes } from './types';
import { AppThunk, typedAction } from '../util';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import DestinationService from '../../services/destinationService';
import Destination from '../../../../shared/models/destination';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import { updateTrecipe as updateTrecipeInList } from '../TrecipeList/action';
import Trecipe from '../../../../shared/models/trecipe';
import TrecipeService from '../../services/trecipeService';
import { updateTrecipe } from '../Trecipe/action';

export const getDestModelsByTrecipeId = (trecipeId: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        DestinationService.getDestinationsByTrecipeId(trecipeId).then(
            (dests: Array<Destination>) => {
                dispatch(loadByTrecipeId(trecipeId, dests));
            }
        );
    };
};

export const addDestinationRequest = (
    trecipe: Trecipe,
    destData: CreateNewDestinationDTO
): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        DestinationService.createDestination(destData).then((dest: Destination) => {
            dispatch(addDestination(trecipe.uuid, dest));
            TrecipeService.updateTrecipe(trecipe.uuid, {
                destinations: [...trecipe.destinations, { destUUID: dest.uuid, completed: false }],
            }).then((updated: Trecipe) => {
                dispatch(updateTrecipeInList(trecipe.uuid, updated));
                dispatch(updateTrecipe(updated));
            });
        });
    };
};

export const removeDestinationRequest = (trecipe: Trecipe, destIdToDelete: string): AppThunk => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        TrecipeService.updateTrecipe(trecipe.uuid, {
            destinations: trecipe.destinations.filter((dest) => dest.destUUID !== destIdToDelete),
        }).then((updated: Trecipe) => {
            dispatch(updateTrecipeInList(trecipe.uuid, updated));
            dispatch(updateTrecipe(updated));
            dispatch(removeDestination(trecipe.uuid, destIdToDelete));
        });
    };
};

export const loadByTrecipeId = (trecipeId: string, destinations: Array<Destination>) => {
    return typedAction(DestinationsActionTypes.LOAD_DESTS_BY_TRECIPE_ID, {
        trecipeId: trecipeId,
        dests: destinations,
    });
};

export const addDestination = (trecipeId: string, destination: Destination) => {
    return typedAction(DestinationsActionTypes.ADD_DESTINATION, {
        trecipeId: trecipeId,
        dest: destination,
    });
};

export const removeDestination = (trecipeId: string, destinationId: string) => {
    return typedAction(DestinationsActionTypes.REMOVE_DESTINATION, {
        trecipeId: trecipeId,
        destinationId: destinationId,
    });
};

export type DestinationsAction = ReturnType<
    typeof loadByTrecipeId | typeof addDestination | typeof removeDestination
>;
