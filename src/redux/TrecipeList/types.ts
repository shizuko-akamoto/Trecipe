import Background from "../../pages/MyTrecipe/TrecipeCard/DefaultImage.png";

/**
 * TODO: Remove this when we can generate ids in the backend
 */
let nextUniqueId: number = 0;
const getNextUniqueId = () => {
  return nextUniqueId++;
};

/**
 * Trecipe Model
 * id: unique id for Trecipe
 * name: Trecipe title
 * imageSrc: Backgroud image source
 * author: Owner of the Trecipe
 * isPrivate: true if the Trecipe is a private one, false otherwise
 * totalDest: total number of destination in this Trecipe
 * completedDest: number of destination that has been checked off
 */
export interface TrecipeModel {
  id: number;
  name: string;
  imageSrc: string | null;
  date: string;
  author: string;
  description: string;
  isPrivate: boolean;
  totalDest: number;
  completedDest: number;
}

export function newTrecipeModel(): TrecipeModel {
  return {
    id: getNextUniqueId(), // temporary until we get backend to generate unique id
    name: "trecipe title",
    imageSrc: "url(" + Background + ")",
    date: "2020-01-01", // maybe change it to Date
    author: "team2",
    description: "This is a description.",
    isPrivate: true,
    totalDest: 0,
    completedDest: 0,
  };
}

export type TrecipeListState = {
  trecipes: Array<TrecipeModel>;
};

export const initialState: TrecipeListState = { trecipes: [] };

export enum TrecipeListActionTypes {
  CREATE_NEW_TRECIPE = "@trecipeList/CREATE_NEW_TRECIPE",
  DELETE_TRECIPE = "@trecipeList/DELETE_TRECIPE",
  UPDATE_TRECIPE = "@trecipeList/UPDATE_TRECIPE",
}
