// rootReducer.ts

import { combineReducers } from "redux";
import favoriteRecipesReducer from "./favoriteRecipesReducer";
import customRecipesReducer from "./customRecipesReducer";

const rootReducer = combineReducers({
  favoriteRecipes: favoriteRecipesReducer,
  customRecipes: customRecipesReducer,
});

export default rootReducer;
