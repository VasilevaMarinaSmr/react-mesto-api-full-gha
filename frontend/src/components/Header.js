import { NavLink, Route, Routes } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

function Header(props) {

  function handleSignOut() {
    props.onLogout();
  }

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место Россия" />

      <Routes>
        <Route
          exact
          path="/sign-up"
          element={
            <NavLink to="/sign-in" className="header__nav-link">
              Войти
            </NavLink>
          }
        />
        <Route
          exact
          path="/sign-in"
          element={
            <NavLink to="/sign-up" className="header__nav-link">
              Регистрация
            </NavLink>
          }
        />
        <Route
          exact
          path="/"
          element={
              <div className="header__info">
                <p className="header__email">{props.userEmail || ""}</p>
                <button
                  className="button header__exit-button"
                  onClick={handleSignOut}
                >
                  Выйти
                </button>
              </div>     
        }
        />
      </Routes>
    </header>
  );
}

export default Header;
