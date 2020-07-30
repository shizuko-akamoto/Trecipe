import Destination from './destination'
import Trecipe from './trecipe'
import { CreateNewDestinationDTO } from './createNewDestinationDTO'
import User from 'server/server/api/user/user.interface';
export interface SearchResultModel {
    trecipeResult: Trecipe[];
    destinationResult: Destination[];
    userResult: User[];
    googleDestinationResult: CreateNewDestinationDTO[];
}