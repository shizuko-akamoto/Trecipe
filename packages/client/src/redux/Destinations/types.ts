import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UnreachableCaseException } from '../../exceptions/Exceptions';
import SampleDestImage from '../../pages/Trecipe/sample.jpg';

/**
 * TODO: Remove this when we can generate ids in the backend
 */
let nextUniqueDestinationId = 0;
const getNextUniqueDestinationId = () => {
    return nextUniqueDestinationId++;
};

/**
 * Destination Category
 */
export enum DestinationCategory {
    Food = 'Food',
    Shopping = 'Shopping',
    Accommodation = 'Accommodation',
    Attraction = 'Attraction',
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
        default:
            throw new UnreachableCaseException(category);
    }
}

/**
 * Rating: destination rating in a range of 0 (lowest) to 5 (highest)
 */
export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

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
    id: string;
    name: string;
    category: DestinationCategory;
    address: string;
    rating: Rating;
    description: string;
    imgSrc: string;
}

/**
 * Returns a new default DestinationModel
 */
export function newDestinationModel(): DestinationModel {
    return {
        id: String(getNextUniqueDestinationId()),
        name: `Destination ${nextUniqueDestinationId}`,
        category: DestinationCategory.Food,
        address: 'City, Country',
        rating: 3,
        description: 'Some overview on this destination.',
        imgSrc: SampleDestImage,
    };
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
}
