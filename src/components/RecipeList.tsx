import React, { useState } from "react";
import RecipeItem from "./RecipeItem";
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

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddRecipe = (recipe: Recipe) => {
    dispatch(addRecipe(recipe));
  };

  const handleRemoveRecipe = (id: number) => {
    dispatch(removeRecipe(id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterRecipes = (recipes: Recipe[], query: string) => {
    return recipes.filter((recipe) => {
      const titleMatch = recipe.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      );
      return titleMatch || ingredientsMatch;
    });
  };

  const filteredRecipes = filterRecipes(recipes, searchQuery);

  return (
    <>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearch}
        className="search-input"
      />
      <div className="recipe-list">
        {filteredRecipes.map((recipe, index) => (
          <div className="recipe-item">
            <RecipeItem key={index} recipe={recipe} />
            {isLoggedIn && (
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
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;
