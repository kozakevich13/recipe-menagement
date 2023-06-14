import { configureStore } from "@reduxjs/toolkit";
import favoriteRecipesReducer from "./favoriteRecipes";

const store = configureStore({
  reducer: {
    favoriteRecipes: favoriteRecipesReducer,
  },
});

export default store;
