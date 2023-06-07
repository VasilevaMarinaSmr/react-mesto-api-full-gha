import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(authData);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setAuthData({ ...authData, [name]: value });
  };

  return (
    <main>
      <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <h3 className="login__title">Вход</h3>
          <input
            type="email"
            className="login__input login__input_type_email"
            minLength="5"
            maxLength="100"
            name="email"
            value={authData.email}
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
            autoComplete="on"
            value={authData.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <button className="button button__submit-login-form" type="submit">
            Войти
          </button>          
        </form>
      </div>
    </main>
  );
};

export default Login;
