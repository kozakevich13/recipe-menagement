// recipeActions.ts

export const addFavoriteRecipe = (recipeId: string) => {
  return {
    type: "ADD_FAVORITE_RECIPE",
    payload: recipeId,
  };
};

export const addCustomRecipe = (recipe: any) => {
  return {
    type: "ADD_CUSTOM_RECIPE",
    payload: recipe,
  };
};
