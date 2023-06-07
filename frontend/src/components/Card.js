import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  const trashButtonElementClassName = `element__trash ${
    isOwn && "element__trash_show"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button
        type="button"
        className={trashButtonElementClassName}
        onClick={handleDeleteClick}
      />
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info-container">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p
            className={`element__like-count  ${
              card.likes.length > 0 ? "element__likes-number_active" : ""
            }`}
          >
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
