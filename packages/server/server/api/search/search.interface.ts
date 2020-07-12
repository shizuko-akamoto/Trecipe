import Trecipe from "../trecipe/trecipe.interface";
import Destination from "../destinations/destination.interface";
import User from "../user/user.interface";

export interface SearchResult {
    trecipeResult: Trecipe[];
    destinationResult: Destination[];
    userResult: User[];
}