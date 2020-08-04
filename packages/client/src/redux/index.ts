import { combineReducers } from 'redux';
import { trecipeListReducer } from './TrecipeList/reducer';
import { modalReducer } from './Modal/reducer';
import { destinationsReducer } from './Destinations/reducer';
import { trecipeReducer } from './Trecipe/reducer';
import { userReducer } from './User/reducer';
import { searchResultReducer } from './SearchResult/reducer';

export const rootReducer = combineReducers({
    trecipeList: trecipeListReducer,
    modal: modalReducer,
    destinations: destinationsReducer,
    trecipe: trecipeReducer,
    user: userReducer,
    searchResult: searchResultReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
