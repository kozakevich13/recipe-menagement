import React from "react";
interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

interface RecipeFormProps {
  recipe: Recipe;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipe,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label>
        Ingredients:
        <textarea
          name="ingredients"
          value={recipe.ingredients.join("\n")}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label>
        Instructions:
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <button className="btn" type="submit" onClick={handleSubmit}>
        {recipe.id ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
