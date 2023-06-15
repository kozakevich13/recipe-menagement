import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeRecipe,
  removeUserRecipe,
  addUserRecipe,
  updateUserRecipe,
} from "../redux/favoriteRecipes";
import RecipeItem from "../components/RecipeItem";
import RecipeForm from "../components/RecipeForm";
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
      <h3>Додати новий рецепт</h3>
      {showAddForm ? (
        <div className="overlay">
          <div className="form-container">
            <button className="btn" onClick={toggleAddForm}>
              Сказувати
            </button>
            <form onSubmit={handleAddRecipe}>
              <label>
                Назва:
                <input
                  type="text"
                  name="title"
                  value={newRecipe.title}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Опис:
                <textarea
                  name="description"
                  value={newRecipe.description}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Інградієнти:
                <textarea
                  name="ingredients"
                  value={newRecipe.ingredients.join("\n")}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Інструкція приготування:
                <textarea
                  name="instructions"
                  value={newRecipe.instructions}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <label>
                Фото URL:
                <input
                  type="text"
                  name="image"
                  value={newRecipe.image}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </label>
              <button className="btn" type="submit" onClick={handleAddRecipe}>
                Додати рецепт
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button className="btn" onClick={toggleAddForm}>
          Додати рецепт
        </button>
      )}
      {showEditForm && editRecipe && (
        <div className="overlay">
          <div className="form-container">
            <h2>Редагувати рецепт</h2>
            <RecipeForm
              recipe={editRecipe}
              handleInputChange={(e) =>
                setEditRecipe({ ...editRecipe, title: e.target.value })
              }
              handleSubmit={handleUpdateRecipe}
            />
          </div>
        </div>
      )}
      <h2>Вподобані рецепти</h2>
      <button className="btn" onClick={toggleUserRecipes}>
        {showUserRecipes
          ? "Сховати рецепти користувача"
          : "Показати рецепти користувача"}
      </button>
      <button className="btn" onClick={toggleFavoriteRecipes}>
        {showFavoriteRecipes
          ? "Сховати вподобані рецепти"
          : "Показати вподобані рецепти"}
      </button>
      <input
        type="text"
        placeholder="пошук рецепта..."
        onChange={handleSearch}
        className="search-input"
      />
      {showUserRecipes && (
        <div>
          <h2>Рецепти додані користувачем {userName}</h2>
          {filteredUserRecipes.map((recipe: any) => (
            <div className="recipe-item" key={recipe.id}>
              <RecipeItem key={recipe.id} recipe={recipe} />
              <button
                className="btn"
                onClick={() => handleRemoveUserRecipe(recipe.title)}
              >
                Видалити
              </button>
              <button className="btn" onClick={() => handleEditRecipe(recipe)}>
                Редагувати
              </button>
            </div>
          ))}
        </div>
      )}
      {showFavoriteRecipes && (
        <div>
          <h2>Рецепти вподобані користувачем {userName}</h2>
          {filteredFavoriteRecipes.map((recipe: any, index: number) => (
            <div className="recipe-item" key={recipe.id}>
              <RecipeItem key={recipe.id} recipe={recipe} />
              <button
                className="btn"
                onClick={() => handleRemoveRecipe(recipe.id)}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
