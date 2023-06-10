import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api.js";
import { getAuthData, login, register } from "../utils/Auth.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRegSuccess, setRegSuccess] = useState(false);


  
function checkAuth() {
  getAuthData()
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        setLoggedIn(false);
        setCurrentUser({});
        navigate("/signin", { replace: true });
        } else {
        setUserEmail(res.user.email); /// вот тут вопрос
        setLoggedIn(true);
        navigate("/", { replace: true });
      }
    })
    .catch((err) => console.error(err));
}

useEffect(() => {
  api
    .getStartData()
    .then(([user, cards]) => {
      setCurrentUser(user.user);
      setCards(cards);
    })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

 
  useEffect(() => {
    checkAuth();
    }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCard) => prevCard.filter((c) => c._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api
      .updateProfile(userInfo.name, userInfo.about)
      .then((res) => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar(link)
      .then((res) => setCurrentUser(res))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createCard({ name: card.name, link: card.link })
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  const handleLogout = () => {
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  function handleLogin(authData) {
    login(authData)
      .then((res) => {
        setCurrentUser(res);
        setUserEmail(res.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  function handleRegistration(authData) {
    register(authData)
      .then((res) => {
        setRegSuccess(true);
        setInfoTooltipPopupOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setRegSuccess(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header onLogout={handleLogout} userEmail={userEmail} />
          <Routes>
            <Route
              path="/sign-in"
              exact
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/sign-up"
              exact
              element={<Register onRegister={handleRegistration} />}
            />
            <Route
              path="/"
              exact
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  isEditProfilePopupOpen={handleEditProfileClick}
                  isAddPlacePopupOpen={handleAddPlaceClick}
                  isEditAvatarPopupOpen={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  LoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <navigate to="/" replace />
                ) : (
                  <navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonTitle="да"
          ></PopupWithForm>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isRegSuccess={isRegSuccess}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
