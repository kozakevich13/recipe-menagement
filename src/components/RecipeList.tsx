import React from "react";
import "../style/RecipeList.css";
import { useSelector, useDispatch } from "react-redux";
import { addRecipe, removeRecipe } from "../redux/favoriteRecipes";

interface Recipe {
  id: number;
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
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );
  const dispatch = useDispatch();

  const handleAddRecipe = (recipe: Recipe) => {
    dispatch(addRecipe(recipe));
  };

  const handleRemoveRecipe = (id: number) => {
    dispatch(removeRecipe(id));
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

          {isLoggedIn ? (
            <>
              <button
                className="btn"
                onClick={() => handleAddRecipe(recipe)}
                disabled={favoriteRecipes.some(
                  (favoriteRecipe: { id: number }) =>
                    favoriteRecipe.id === recipe.id
                )}
              >
                Add to Favorites
              </button>
              <button
                className="btn"
                onClick={() => handleRemoveRecipe(recipe.id)}
                disabled={
                  !favoriteRecipes.some(
                    (favoriteRecipe: { id: number }) =>
                      favoriteRecipe.id === recipe.id
                  )
                }
              >
                Remove from Favorites
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
