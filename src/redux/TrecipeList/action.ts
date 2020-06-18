import { typedAction } from "../util";
import { newTrecipeModel, TrecipeListActionTypes, TrecipeModel } from "./types";
import { AnyAction, Dispatch } from "redux";

const mockTrecipeList: Array<TrecipeModel> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
].map(() => newTrecipeModel());

export const createNewTrecipe = (newTrecipe: TrecipeModel) => {
  return typedAction(TrecipeListActionTypes.CREATE_NEW_TRECIPE, newTrecipe);
};

export const deleteTrecipe = (idToDelete: number) => {
  return typedAction(TrecipeListActionTypes.DELETE_TRECIPE, idToDelete);
};

export const updateTrecipe = (
  idToUpdate: number,
  updatedTC: Partial<TrecipeModel>
) => {
  return typedAction(TrecipeListActionTypes.UPDATE_TRECIPE, {
    id: idToUpdate,
    updated: updatedTC,
  });
};

export const loadTrecipes = () => {
  // Pretending to wait for loading by setTimeout
  return (dispatch: Dispatch<AnyAction>) => {
    setTimeout(() => {
      mockTrecipeList.forEach((tc) => dispatch(createNewTrecipe(tc)));
    }, 1000);
  };
};

export type TrecipeListAction = ReturnType<
  typeof createNewTrecipe | typeof deleteTrecipe | typeof updateTrecipe
>;
