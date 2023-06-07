import React from "react";

import regFail from "../images/fail_reg.svg";
import regSuccess from "../images/success_reg.svg";

 function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_form_info-tooltip 
        ${props.isOpen && "popup_opened"} `}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image-info-tooltip"
          src={props.isRegSuccess ? regSuccess : regFail}
          alt={"Картинка состояния регистрации"}
        />
        <p className="popup__text-info-tooltip">
          {props.isRegSuccess
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;


