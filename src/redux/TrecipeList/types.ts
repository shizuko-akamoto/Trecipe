import Background from "../../pages/MyTrecipes/TrecipeCard/DefaultImage.png";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { UnreachableCaseException } from "../../exceptions/Exceptions";
import SampleDestImage from "../../pages/Trecipe/sample.jpg";

/**
 * TODO: Remove this when we can generate ids in the backend
 */
let nextUniqueTrecipeId: number = 0;
const getNextUniqueTrecipeId = () => {
  return nextUniqueTrecipeId++;
};

/**
 * TODO: Remove this when we can generate ids in the backend
 */
let nextUniqueDestinationId: number = 0;
const getNextUniqueDestinationId = () => {
  return nextUniqueDestinationId++;
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
 * destinations: list of destinations in this trecipe (TODO: switch to storing Destination id only as reference)
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
  destinations: Array<DestinationModel>;
}

/**
 * Destination Category
 */
export enum DestinationCategory {
  Food = "Food",
  Shopping = "Shopping",
  Accommodation = "Accommodation",
  Attraction = "Attraction",
}

/**
 * Get icon props associated with each category.
 * Throws UnreachableCaseException if an icon category is not properly associated to an icon
 * @param category: the category to get icon prop for
 */
export function getIcon(category: DestinationCategory): IconProp {
  switch (category) {
    case DestinationCategory.Food:
      return "utensils";
    case DestinationCategory.Shopping:
      return "shopping-cart";
    case DestinationCategory.Accommodation:
      return "bed";
    case DestinationCategory.Attraction:
      return "binoculars";
    default:
      throw new UnreachableCaseException(category);
  }
}

/**
 * DestinationModal
 * id: destination unique id
 * name: destination name
 * category: destination category
 * address: destination address
 * rating: destination rating
 * description: destination description
 * imgSrc: destination image
 */
export interface DestinationModel {
  id: number;
  name: string;
  category: DestinationCategory;
  address: string;
  rating: Rating;
  description: string;
  imgSrc: string;
}

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type RatingBarProps = {
  rating: Rating;
};

/**
 * Returns a new default DestinationModel
 */
export function newDestinationModel(): DestinationModel {
  return {
    id: getNextUniqueDestinationId(),
    name: "Destination Name",
    category: DestinationCategory.Food,
    address: "City, Country",
    rating: 3,
    description: "Some overview on this destination.",
    imgSrc: SampleDestImage,
  };
}

/**
 * Returns a new default TrecipeModal
 */
export function newTrecipeModel(): TrecipeModel {
  return {
    id: getNextUniqueTrecipeId(), // temporary until we get backend to generate unique id
    name: "Trecipe Name",
    imageSrc: "url(" + Background + ")",
    date: "2020/06/18", // maybe change it to Date
    author: "",
    description: "",
    isPrivate: true,
    totalDest: 0,
    completedDest: 0,
    destinations: [0, 1, 2, 3, 4, 5].map(() => newDestinationModel()),
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
}
