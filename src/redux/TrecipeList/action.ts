import {typedAction} from "../util";
import {newTrecipeModel, TrecipeListActionTypes, TrecipeModel} from "./types";
import {Dispatch, AnyAction} from "redux";

const mockTrecipeList: Array<TrecipeModel> = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
    const newTC: TrecipeModel = newTrecipeModel();
    newTC.id = index;
    return newTC;
});

export const createNewTrecipe = (newTrecipe: TrecipeModel) => {
    return typedAction(TrecipeListActionTypes.CREATE_NEW_TRECIPE, newTrecipe);
};

export const deleteTrecipe = (idToDelete: number) => {
    return typedAction(TrecipeListActionTypes.DELETE_TRECIPE, idToDelete);
};

export const updateTrecipe = (idToUpdate: number, updatedTC: TrecipeModel) => {
    return typedAction(TrecipeListActionTypes.UPDATE_TRECIPE, updatedTC);
};

export const loadTrecipes = () => {
    // Pretending to wait for loading by setTimeout
    return (dispach: Dispatch<AnyAction>) => {
        setTimeout(() => {
            mockTrecipeList.forEach((tc) => dispach(createNewTrecipe(tc)))
        }, 1000)
    }
};

export type TrecipeListAction = ReturnType<typeof createNewTrecipe | typeof deleteTrecipe | typeof updateTrecipe>;