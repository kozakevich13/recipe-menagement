import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

interface FavoriteRecipesState {
  recipes: Recipe[];
}

const initialState: FavoriteRecipesState = {
  recipes: [],
};

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.title !== action.payload
      );
    },
  },
});

export const { addRecipe, removeRecipe } = favoriteRecipesSlice.actions;
export default favoriteRecipesSlice.reducer;
