import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="update-link"
        type="url"
        id="linkAvatar"
        required
        className="form-popup__text form-popup__text_modified_link"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span
        id="link-avatar-error"
        className="form-popup__error linkAvatar-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
