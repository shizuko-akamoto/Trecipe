import {Rating} from "./destination";

/**
 * DTO for updating a destination with new rating
 * userId: username of the rater
 * trecipeId: trecipe uuid of that contains this destination
 * rating: new rating
 */
export interface UpdateDestinationRatingDTO {
    userId: string;
    trecipeId: string;
    rating: Rating;
}