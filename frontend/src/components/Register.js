import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(authData);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setAuthData({ ...authData, [name]: value });
  };
  return (
    <main>
      <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <h3 className="login__title">Регистрация</h3>
          <input
            type="email"
            className="login__input login__input_type_email"
            minLength="5"
            maxLength="100"
            name="email"
            value={authData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="login__input login__input_type_pswd"
            minLength="5"
            maxLength="30"
            name="password"
            value={authData.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            autoComplete="on"
            required
          />
          <button className="button button__submit-login-form" type="submit">
          Зарегистрироваться
          </button>
        <div className="login__register-text">
          <p>Уже зарегистрированы? <Link to="/sign-in" className="login__register-link">Войти</Link></p>
        </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
