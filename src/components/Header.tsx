import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <Link to="/">
        <h2 className="header-title">Recipes</h2>
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/favorite-recipes">
            <button className="btn">
              Favorite Recipes ({favoriteRecipes.length})
            </button>
          </Link>
          <button type="button" onClick={handleLogout} className="btn">
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">
            Авторизація
          </Link>
          <Link to="/register" className="nav-link">
            Реєстрація
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
