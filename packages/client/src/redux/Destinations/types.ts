import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UnreachableCaseException } from '../../exceptions/Exceptions';
import SampleDestImage from '../../pages/Trecipe/sample.jpg';

/**
 * Destination Category
 */
export enum DestinationCategory {
    Food = 'Food',
    Shopping = 'Shopping',
    Accommodation = 'Accommodation',
    Attraction = 'Attraction',
    Others = 'Others',
}

/**
 * Get icon props associated with each category.
 * Throws UnreachableCaseException if an icon category is not properly associated to an icon
 * @param category: the category to get icon prop for
 */
export function getIcon(category: DestinationCategory): IconProp {
    switch (category) {
        case DestinationCategory.Food:
            return 'utensils';
        case DestinationCategory.Shopping:
            return 'shopping-cart';
        case DestinationCategory.Accommodation:
            return 'bed';
        case DestinationCategory.Attraction:
            return 'binoculars';
        case DestinationCategory.Others:
            return 'map-marked-alt';
        default:
            throw new UnreachableCaseException(category);
    }
}

/**
 * Rating: destination rating in a range of 0 (lowest) to 5 (highest)
 */
export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type Geometry = { lat: number; lng: number };

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
    uuid: string;
    name: string;
    category: Array<DestinationCategory>;
    geometry: Geometry;
    address?: string;
    phone?: string;
    website?: string;
    description: string;
    rating: Rating;
    userRatings: Array<Rating>;
    photoRefs: Array<string>;
    placeId: string;
}

/**
 * DestinationsState
 */
export type DestinationsState = {
    destsByTrecipeId: Map<string, Array<DestinationModel>>;
};

export const initialState = {
    destsByTrecipeId: new Map<string, Array<DestinationModel>>(),
};

export enum DestinationsActionTypes {
    LOAD_DESTS_BY_TRECIPE_ID = '@destination/LOAD_DESTS_BY_TRECIPE_ID',
    ADD_DESTINATION = '@destination/ADD_DESTINATION',
    REMOVE_DESTINATION = '@destination/REMOVE_DESTINATION',
}
