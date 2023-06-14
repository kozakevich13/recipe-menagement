import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeRecipe } from "../redux/favoriteRecipes";

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
      {favoriteRecipes.map((recipe: any) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <ul>
            {recipe.ingredients.map((ingredient: any, index: any) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{recipe.instructions}</p>
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          <button className="btn" onClick={() => handleRemoveRecipe(recipe.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
