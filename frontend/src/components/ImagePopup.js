import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_form_big-picture ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <button
          className="popup__button-close popup__button-close_picture_big"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          alt={props.card?.name}
          src={props.card?.link}
        />
        <p className="popup__description">{props.card?.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
