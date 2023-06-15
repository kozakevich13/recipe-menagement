import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Отримання пароля з сесійного сховища
    const storedPassword = localStorage.getItem(email);

    // Перевірка авторизаційних даних
    if (storedPassword && storedPassword === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      window.location.href = "/dashboard";
    } else {
      setError("Неправильні дані авторизації");
    }
  };

  return (
    <div>
      <h2>Авторизація</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="btn" type="button" onClick={handleLogin}>
          Увійти
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
