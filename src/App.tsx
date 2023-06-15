import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Home from "./pages/Home";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/recipe-menagement/" element={<Home />} />
        <Route path="/recipe-menagement/login" element={<Login />} />
        <Route path="/recipe-menagement/register" element={<Register />} />
        <Route path="/recipe-menagement/dashboard" element={<Dashboard />} />
        <Route
          path="/recipe-menagement/favorite-recipes"
          element={<FavoriteRecipes />}
        />
      </Routes>
    </Router>
  );
};

export default App;
