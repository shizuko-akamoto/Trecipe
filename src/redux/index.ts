import { combineReducers } from "redux";
import { trecipeListReducer } from "./TrecipeList/reducer";
import { modalReducer } from "./Modal/reducer";

export const rootReducer = combineReducers({
  trecipeList: trecipeListReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
