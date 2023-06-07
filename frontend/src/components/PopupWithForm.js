import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_form_${props.name} 
        ${props.isOpen && "popup_opened"} `}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className={`form-popup  form-popup_${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button className="form-popup__save" type="submit">
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
