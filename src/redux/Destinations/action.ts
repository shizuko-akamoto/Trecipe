import {
  DestinationModel,
  DestinationsActionTypes,
  newDestinationModel,
} from "./types";
import { typedAction } from "../util";
import { AnyAction, Dispatch } from "redux";

const mockDestinations: Array<DestinationModel> = [1, 2, 3, 4, 5, 6].map(() =>
  newDestinationModel()
);

export const getDestModelsByTrecipeId = (trecipeId: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    setTimeout(() => {
      dispatch(loadByTrecipeId(trecipeId, mockDestinations));
    }, 500);
  };
};

export const loadByTrecipeId = (
  trecipeId: string,
  destinations: Array<DestinationModel>
) => {
  return typedAction(DestinationsActionTypes.LOAD_DESTS_BY_TRECIPE_ID, {
    trecipeId: trecipeId,
    dests: destinations,
  });
};

export type DestinationsAction = ReturnType<typeof loadByTrecipeId>;
