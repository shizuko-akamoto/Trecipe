import { DestinationModel, DestinationsActionTypes } from './types';
import { AppThunk, typedAction } from '../util';
import { Action, AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import DestinationService from '../../services/destinationService';

export const getDestModelsByTrecipeId = (trecipeId: string) => {
    return (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
        DestinationService.getDestinationsByTrecipeId(trecipeId).then(
            (dests: Array<DestinationModel>) => {
                dispatch(loadByTrecipeId(trecipeId, dests));
            }
        );
    };
};

export const loadByTrecipeId = (trecipeId: string, destinations: Array<DestinationModel>) => {
    return typedAction(DestinationsActionTypes.LOAD_DESTS_BY_TRECIPE_ID, {
        trecipeId: trecipeId,
        dests: destinations,
    });
};

export const addDestination = (trecipeId: string, destination: DestinationModel) => {
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
