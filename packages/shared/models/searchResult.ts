import Destination from './destination'
import Trecipe from './trecipe'
import { CreateNewDestinationDTO } from './createNewDestinationDTO'
import  { User } from './user';
export interface SearchResultModel {
    trecipeResult: Trecipe[];
    destinationResult: Destination[];
    userResult: User[];
    googleDestinationResult: CreateNewDestinationDTO[];
}