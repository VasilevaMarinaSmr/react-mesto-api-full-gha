import React, { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form-popup__profile-info">
        <input
          name="update-name"
          type="text"
          id="name"
          minLength="2"
          maxLength="40"
          className="form-popup__text form-popup__text_modified_name"
          placeholder="Имя"
          required
          onChange={handleChangeName}
          value={name ? name : ""}
        />
        <span id="name-error" className="form-popup__error name-error"></span>
        <input
          name="update-profession"
          type="text"
          id="profession"
          minLength="2"
          maxLength="200"
          className="form-popup__text form-popup__text_modified_profession"
          placeholder="О себе"
          required
          onChange={handleChangeDescription}
          value={description ? description : ""}
        />
        <span
          id="profession-error"
          className="form-popup__error profession-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
