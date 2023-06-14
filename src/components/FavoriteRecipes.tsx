import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeRecipe } from "../redux/favoriteRecipes";
import RecipeItem from "./RecipeItem";

const FavoriteRecipes: React.FC = () => {
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );

  console.log("sss");

  const dispatch = useDispatch();

  const handleRemoveRecipe = (id: number) => {
    dispatch(removeRecipe(id));
  };

  return (
    <div>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.map((recipe: any, index: number) => (
        <div className="recipe-item" key={recipe.id}>
          <RecipeItem key={index} recipe={recipe} />
          <button className="btn" onClick={() => handleRemoveRecipe(recipe.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
