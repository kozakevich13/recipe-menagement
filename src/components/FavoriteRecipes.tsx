import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeRecipe } from "../redux/favoriteRecipes";

const FavoriteRecipes: React.FC = () => {
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );
  const dispatch = useDispatch();

  const handleRemoveRecipe = (title: string) => {
    dispatch(removeRecipe(title));
  };

  return (
    <div>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.map((recipe: any) => (
        <div key={recipe.title}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <ul>
            {recipe.ingredients.map((ingredient: any, index: any) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{recipe.instructions}</p>
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          <button onClick={() => handleRemoveRecipe(recipe.title)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
