import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

interface FavoriteRecipesState {
  recipes: Recipe[];
  userRecipes: Recipe[];
}

const initialState: FavoriteRecipesState = {
  recipes: [],
  userRecipes: [],
};

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action: PayloadAction<number>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    addUserRecipe: (state, action: PayloadAction<Recipe>) => {
      state.userRecipes.push(action.payload);
    },
    removeUserRecipe: (state, action: PayloadAction<string>) => {
      state.userRecipes = state.userRecipes.filter(
        (recipe) => recipe.title !== action.payload
      );
    },
  },
});

export const { addRecipe, removeRecipe, addUserRecipe, removeUserRecipe } =
  favoriteRecipesSlice.actions;
export default favoriteRecipesSlice.reducer;
