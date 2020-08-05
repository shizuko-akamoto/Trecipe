import Trecipe from '../../../../shared/models/trecipe';
import Destination from '../../../../shared/models/destination';
import { User } from '../../../../shared/models/user';

export interface SearchResult {
    trecipeResult: Trecipe[];
    destinationResult: Destination[];
    userResult: User[];
}

export const mapToSearchResult = (
    searchResult: [Trecipe[], Destination[], User[]]
): SearchResult => {
    return {
        trecipeResult: searchResult[0],
        destinationResult: searchResult[1],
        userResult: searchResult[2],
    };
};
