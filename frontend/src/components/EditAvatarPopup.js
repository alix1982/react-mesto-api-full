import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useFormWithValidation} from './formValidation.js';

function EditAvatarPopup (props) {
  const inputAvatarRef = useRef();
  const { errors, isValid, isValidInputs, handleChange, resetForm} = useFormWithValidation();

  useEffect(()=>{
    
    if (props.isOpen) {
      inputAvatarRef.current.value = '';
      resetForm();
    }
  },[props.isOpen])

  function handleOnSubmit (e) {
    e.preventDefault();
    props.onTextButtonSubmit("Сохранение...");
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }
  return(
    <PopupWithForm name="Avatar" title="Обновить аватар" 
      buttonText={props.onTextButton}
      isValid={isValid}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {handleOnSubmit}
    >
      <input 
        id="link-input-avatar" className={`form__text formAvatar__text formAvatar__text_link ${!isValidInputs.linkAvatar && 'form__text_error'}`}
        type="url" name="linkAvatar" placeholder="Ссылка на аватар" ref={inputAvatarRef} required onChange={handleChange}
      />
      <span className="link-input-avatar-error form__message-error">{errors.linkAvatar}</span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup