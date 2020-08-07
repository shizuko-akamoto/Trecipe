import Destination from './destination'
import Trecipe from './trecipe'
import  { User } from './user';

/**
 * Model for search results of combined sources
 */
export interface SearchResultModel {
    trecipeResult: Trecipe[];
    destinationResult: Destination[];
    userResult: User[];
    googleDestinationResult: Destination[];
}