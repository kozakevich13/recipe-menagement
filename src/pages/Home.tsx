import React from "react";
import recipeData from "../recipeData";
import RecipeList from "../components/RecipeList";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Загальний список рецептів</h1>
      <RecipeList recipes={recipeData} />
    </div>
  );
};

export default Home;
