import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeRecipe,
  removeUserRecipe,
  addUserRecipe,
  updateUserRecipe,
} from "../redux/favoriteRecipes";
import RecipeItem from "./RecipeItem";
import "../style/FavoriteRecipes.css";

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);
  const [showUserRecipes, setShowUserRecipes] = useState(true);
  const [showFavoriteRecipes, setShowFavoriteRecipes] = useState(true);
  const userName = localStorage.getItem("userEmail");

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

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const toggleUserRecipes = () => {
    setShowUserRecipes(!showUserRecipes);
  };

  const toggleFavoriteRecipes = () => {
    setShowFavoriteRecipes(!showFavoriteRecipes);
  };

  const handleAddRecipe = (e: React.FormEvent) => {
    // Логіка додавання нового рецепту
    const uniqueId = Date.now();
    dispatch(addUserRecipe({ ...newRecipe, id: uniqueId }));
    setNewRecipe({
      id: 0,
      title: "",
      description: "",
      ingredients: [],
      instructions: "",
      image: "",
    });
    toggleAddForm();
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditRecipe(recipe);
    toggleEditForm();
  };

  const handleUpdateRecipe = () => {
    // Логіка оновлення рецепту
    if (editRecipe) {
      dispatch(updateUserRecipe(editRecipe));
    }
    toggleEditForm();
  };

  return (
    <div>
      <h3>Add New Recipe</h3>
      {showAddForm ? (
        <div className="overlay">
          <div className="form-container">
            {/* Форма додавання нового рецепту */}
            <button className="btn" onClick={toggleAddForm}>
              Cancel
            </button>
            <form onSubmit={handleAddRecipe}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newRecipe.title}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={newRecipe.description}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Ingredients:
                <textarea
                  name="ingredients"
                  value={newRecipe.ingredients.join("\n")}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Instructions:
                <textarea
                  name="instructions"
                  value={newRecipe.instructions}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={newRecipe.image}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <button className="btn" type="submit" onClick={handleAddRecipe}>
                Add Recipe
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button className="btn" onClick={toggleAddForm}>
          Add Recipe
        </button>
      )}
      {showEditForm && editRecipe && (
        <div className="overlay">
          <div className="form-container">
            <h2>Edit Recipe</h2>
            <form>
              {/* Форма для редагування рецепту зі значеннями в editRecipe */}
              <label>
                Title:
                <input
                  className="form-input"
                  type="text"
                  value={editRecipe.title}
                  onChange={(e) =>
                    setEditRecipe({ ...editRecipe, title: e.target.value })
                  }
                />
              </label>
              <label>
                Description:
                <textarea
                  className="form-input"
                  value={editRecipe.description}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Ingredients (comma-separated):
                <input
                  className="form-input"
                  type="text"
                  value={editRecipe.ingredients.join(",")}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      ingredients: e.target.value.split(","),
                    })
                  }
                />
              </label>
              <label>
                Instructions:
                <textarea
                  className="form-input"
                  value={editRecipe.instructions}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      instructions: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Image URL:
                <input
                  className="form-input"
                  type="text"
                  value={editRecipe.image}
                  onChange={(e) =>
                    setEditRecipe({ ...editRecipe, image: e.target.value })
                  }
                />
              </label>
              <button
                className="btn"
                type="submit"
                onClick={handleUpdateRecipe}
              >
                Update Recipe
              </button>
            </form>
          </div>
        </div>
      )}
      <h2>Favorite Recipes</h2>
      {/* Кнопка для приховування/показу списку рецептів, створених користувачем */}
      <button className="btn" onClick={toggleUserRecipes}>
        {showUserRecipes ? "Hide User Recipes" : "Show User Recipes"}
      </button>
      {/* Кнопка для приховування/показу списку улюблених рецептів */}
      <button className="btn" onClick={toggleFavoriteRecipes}>
        {showFavoriteRecipes
          ? "Hide Favorite Recipes"
          : "Show Favorite Recipes"}
      </button>
      {showUserRecipes && (
        <div>
          <h2>Recipes Added by {userName}</h2>
          {userRecipes.map((recipe: any) => (
            <div className="recipe-item" key={recipe.id}>
              <RecipeItem key={recipe.id} recipe={recipe} />
              {/* Відображення деталей рецепту */}
              <button
                className="btn"
                onClick={() => handleRemoveUserRecipe(recipe.title)}
              >
                Remove
              </button>
              <button className="btn" onClick={() => handleEditRecipe(recipe)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Список улюблених рецептів */}
      {showFavoriteRecipes && (
        <div>
          <h2>Recipes liked by {userName}</h2>
          {favoriteRecipes.map((recipe: any, index: number) => (
            <div className="recipe-item" key={recipe.id}>
              <RecipeItem key={recipe.id} recipe={recipe} />
              <button
                className="btn"
                onClick={() => handleRemoveRecipe(recipe.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
