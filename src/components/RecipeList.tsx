import React from "react";
import "../style/RecipeList.css";
import { useSelector, useDispatch } from "react-redux";
import { addRecipe, removeRecipe } from "../redux/favoriteRecipes";

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );
  const dispatch = useDispatch();

  const handleAddRecipe = (recipe: Recipe) => {
    dispatch(addRecipe(recipe));
  };

  const handleRemoveRecipe = (title: string) => {
    dispatch(removeRecipe(title));
  };
  return (
    <div className="recipe-list">
      <h2 className="recipe-list-title">Загальний список рецептів</h2>
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-item">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-description">{recipe.description}</p>
          <ul className="recipe-ingredients">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p className="recipe-instructions">{recipe.instructions}</p>
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
          )}
          <button
            onClick={() => handleAddRecipe(recipe)}
            disabled={favoriteRecipes.some(
              (favoriteRecipe: { title: string }) =>
                favoriteRecipe.title === recipe.title
            )}
          >
            Add to Favorites
          </button>
          <button
            onClick={() => handleRemoveRecipe(recipe.title)}
            disabled={
              !favoriteRecipes.some(
                (favoriteRecipe: { title: string }) =>
                  favoriteRecipe.title === recipe.title
              )
            }
          >
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
