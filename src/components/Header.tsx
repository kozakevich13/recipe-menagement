import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header: React.FC = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="header">
      <h2 className="header-title">Header</h2>
      {isLoggedIn ? (
        <button type="button" onClick={handleLogout} className="logout-button">
          Log out
        </button>
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
