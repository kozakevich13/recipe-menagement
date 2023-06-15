import React from "react";

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Дашборд</h2>
      <p>Ви увійшли як {localStorage.getItem("userEmail")}</p>
      <button className="btn" type="button" onClick={handleLogout}>
        Вийти
      </button>
    </div>
  );
};

export default Dashboard;
