import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const favoriteRecipes = useSelector(
    (state: any) => state.favoriteRecipes.recipes
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header">
      <Link to="/">
        <button className="btn">
          <h2 className="header-title">Всі рецепти</h2>
        </button>
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/favorite-recipes">
            <button className="btn">
              Вподобані рецепти ({favoriteRecipes.length})
            </button>
          </Link>
          <button type="button" onClick={handleLogout} className="btn">
            Вийти
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="btn">Авторизація</button>
          </Link>
          <Link to="/register">
            {" "}
            <button className="btn">Реєстрація</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
