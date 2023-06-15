import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // Перевірка наявності введеного email у сесійному сховищі
    const registeredEmail = localStorage.getItem(email);
    if (registeredEmail) {
      setError("Цей email вже зареєстрований");
      return;
    }

    // Збереження даних реєстрації в сесійному сховищі
    if (email && password) {
      localStorage.setItem(email, password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard"); // Замість window.location.href
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>
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
        <button className="btn" type="button" onClick={handleRegister}>
          Зареєструватися
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
