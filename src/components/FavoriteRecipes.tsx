import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeRecipe,
  removeUserRecipe,
  addUserRecipe,
} from "../redux/favoriteRecipes";
import RecipeItem from "./RecipeItem";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

const FavoriteRecipes: React.FC = () => {
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );
  const userRecipes = useSelector(
    (state: any) => state.favoriteRecipes.userRecipes
  );

  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: 0,
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    image: "",
  });

  const dispatch = useDispatch();

  const handleRemoveRecipe = (id: number) => {
    dispatch(removeRecipe(id));
  };

  const handleRemoveUserRecipe = (title: string) => {
    dispatch(removeUserRecipe(title));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "ingredients") {
      // Для поля 'ingredients' розбиваємо рядок на масив речень
      const ingredientsArray = value.split("\n");
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: ingredientsArray,
      }));
    } else {
      // Для інших полів просто оновлюємо значення
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const handleAddUserRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUserRecipe(newRecipe));
    setNewRecipe({
      id: 0,
      title: "",
      description: "",
      ingredients: [],
      instructions: "",
      image: "",
    });
  };

  return (
    <div>
      <h3>Add New Recipe</h3>
      <form onSubmit={handleAddUserRecipe}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newRecipe.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newRecipe.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={newRecipe.ingredients.join("\n")}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={newRecipe.image}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Recipe</button>
      </form>
      <h2>Favorite Recipes</h2>
      <h3>Recipes Added by User</h3>
      {userRecipes.map((recipe: any) => (
        <div className="recipe-item" key={recipe.title}>
          <RecipeItem key={recipe.title} recipe={recipe} />
          {/* Відображення деталей рецепту */}
          <button onClick={() => handleRemoveUserRecipe(recipe.title)}>
            Remove
          </button>
        </div>
      ))}
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
