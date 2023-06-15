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
  const [searchQuery, setSearchQuery] = useState("");

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
      const ingredientsArray = value.split("\n");
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: ingredientsArray,
      }));
    } else {
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
    if (editRecipe) {
      dispatch(updateUserRecipe(editRecipe));
    }
    toggleEditForm();
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

  const filteredUserRecipes = filterRecipes(userRecipes, searchQuery);
  const filteredFavoriteRecipes = filterRecipes(favoriteRecipes, searchQuery);

  return (
    <div>
      <h3>Add New Recipe</h3>
      {showAddForm ? (
        <div className="overlay">
          <div className="form-container">
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
      <button className="btn" onClick={toggleUserRecipes}>
        {showUserRecipes ? "Hide User Recipes" : "Show User Recipes"}
      </button>
      <button className="btn" onClick={toggleFavoriteRecipes}>
        {showFavoriteRecipes
          ? "Hide Favorite Recipes"
          : "Show Favorite Recipes"}
      </button>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearch}
        className="search-input"
      />
      {showUserRecipes && (
        <div>
          <h2>Recipes Added by {userName}</h2>
          {filteredUserRecipes.map((recipe: any) => (
            <div className="recipe-item" key={recipe.id}>
              <RecipeItem key={recipe.id} recipe={recipe} />
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
      {showFavoriteRecipes && (
        <div>
          <h2>Recipes liked by {userName}</h2>
          {filteredFavoriteRecipes.map((recipe: any, index: number) => (
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
