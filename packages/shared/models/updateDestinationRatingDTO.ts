import {Rating} from "./destination";

export interface UpdateDestinationRatingDTO {
    userId: string;
    trecipeId: string;
    rating: Rating;
}