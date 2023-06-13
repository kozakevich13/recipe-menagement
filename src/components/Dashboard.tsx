import React from "react";

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    // Видалення даних з сесійного сховища та перенаправлення на сторінку авторизації
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Дашборд</h2>
      <p>Ви увійшли як {sessionStorage.getItem("userEmail")}</p>
      <button type="button" onClick={handleLogout}>
        Вийти
      </button>
    </div>
  );
};

export default Dashboard;
