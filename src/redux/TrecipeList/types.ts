import Background from "../../pages/MyTrecipe/TrecipeCard/DefaultImage.png";

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
    id: 0,
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
