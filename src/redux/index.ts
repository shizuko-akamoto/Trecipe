import { combineReducers } from "redux";
import {trecipeListReducer} from "./TrecipeList/reducer";

export const rootReducer = combineReducers({
    trecipeList: trecipeListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;