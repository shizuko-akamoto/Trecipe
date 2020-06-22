import Background from "../../pages/MyTrecipes/TrecipeCard/DefaultImage.png";

/**
 * TODO: Remove this when we can generate ids in the backend
 */
let nextUniqueTrecipeId: number = 0;
const getNextUniqueTrecipeId = () => {
  return nextUniqueTrecipeId++;
};

/**
 * Trecipe Model
 * id: unique id for Trecipe
 * name: Trecipe title
 * imageSrc: Backgroud image source
 * author: Owner of the Trecipe
 * isPrivate: true if the Trecipe is a private one, false otherwise
 * destinations: list of destinations in this trecipe and isCompleted boolean
 */
export interface TrecipeModel {
  id: string;
  name: string;
  imageSrc: string | null;
  date: string;
  author: string;
  description: string;
  isPrivate: boolean;
  destinations: Array<string>;
  completed: Set<string>;
}

/**
 * Returns a new default TrecipeModal
 */
export function newTrecipeModel(): TrecipeModel {
  return {
    id: String(getNextUniqueTrecipeId()), // temporary until we get backend to generate unique id
    name: `Trecipe ${nextUniqueTrecipeId}`,
    imageSrc: "url(" + Background + ")",
    date: "2020-01-01", // maybe change it to Date
    author: "team2",
    description: "This is a description.",
    isPrivate: true,
    destinations: ["0", "1", "2", "3", "4", "5"],
    completed: new Set<string>(),
  };
}

/**
 * TrecipeListState
 */
export type TrecipeListState = {
  trecipes: Array<TrecipeModel>;
};

export const initialState: TrecipeListState = { trecipes: [] };

export enum TrecipeListActionTypes {
  CREATE_NEW_TRECIPE = "@trecipeList/CREATE_NEW_TRECIPE",
  DELETE_TRECIPE = "@trecipeList/DELETE_TRECIPE",
  UPDATE_TRECIPE = "@trecipeList/UPDATE_TRECIPE",
  LOAD_TRECIPE = "@trecipeList/LOAD_TRECIPE",
}
