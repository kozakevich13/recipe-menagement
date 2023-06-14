import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <h2 className="header-title">Header</h2>
      {isLoggedIn ? (
        <>
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Log out
          </button>
          <li>
            <Link to="/favorite-recipes">
              Favorite Recipes ({favoriteRecipes.length})
            </Link>
          </li>
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
