import React from "react";
import recipeData from "../recipeData";
import RecipeList from "./RecipeList";

const Home: React.FC = () => {
  return (
    <div>
      <h1>home</h1>
      <RecipeList recipes={recipeData} />
    </div>
  );
};

export default Home;
