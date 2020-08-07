import { UnreachableCaseException } from "client/src/exceptions/Exceptions";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

/**
 * User rating with username of rater and rating
 */
export type UserRating = {
    userId: string,
    rating: Rating,
}

/**
 * Destination interface
 */
export default interface Destination {
    uuid: string;
    name: string;
    category: Array<DestinationCategory>;
    geometry: {
        lat: number;
        lng: number;
    };
    formattedAddress: string;
    formattedPhoneNumber: string;
    website: string;
    rating: Rating;
    userRatings: Array<UserRating>;
    description: String,
    placeId: string;
    photoRefs: Array<string>;
}
