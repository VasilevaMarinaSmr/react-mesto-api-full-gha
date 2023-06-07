import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [namePlace, setNamePlace] = useState("");
  const [linkPlace, setLinkPlace] = useState("");
  useEffect(() => {
    setLinkPlace("");
    setNamePlace("");
  }, [props.isOpen]);

  function handleNamePlace(e) {
    setNamePlace(e.target.value);
  }

  function handleLinkPlace(e) {
    setLinkPlace(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: namePlace,
      link: linkPlace,
    });
  }

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form-popup__profile-info">
        <input
          name="update-image-name"
          type="text"
          minLength="2"
          maxLength="30"
          id="place"
          className="form-popup__text form-popup__text_modified_image"
          placeholder="Название"
          value={namePlace ? namePlace : ""}
          onChange={handleNamePlace}
          required
        />
        <span id="plaсe-error" className="form-popup__error place-error"></span>
        <input
          name="update-link"
          type="url"
          id="link"
          required
          className="form-popup__text form-popup__text_modified_link"
          placeholder="Ссылка на картинку"
          value={linkPlace ? linkPlace : ""}
          onChange={handleLinkPlace}
        />
        <span id="link-error" className="form-popup__error link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
