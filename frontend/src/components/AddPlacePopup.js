import {useEffect, useState, useContext, useCallback} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useFormWithValidation} from './formValidation.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';

function AddPlacePopup (props) {
  const userContext = useContext(CurrentUserContext);
  const { values, errors, isValid, isValidInputs, handleChange, resetForm} = useFormWithValidation();

  useEffect(()=>{resetForm()}, [props.isOpen])

  function handleOnSubmit (e) {
    e.preventDefault();
    props.onTextButtonSubmit("Сохранение...");
    const newCard = {
      name:values.title,
      link:values.link,
      owner:userContext
    };
    props.onAddPlace(newCard);
  }

  return (
    
    <PopupWithForm  name="Add" title="Новое место" 
      buttonText={props.onTextButton} 
      isValid={isValid}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {handleOnSubmit}
    >
      <input
        id="title-input" className={`form__text formAdd__text formAdd__text_title ${!isValidInputs.title && 'form__text_error'}`} type="text" name="title" placeholder="Название"
        minLength="2" maxLength="30" required onChange={handleChange} value={values.title || ''}
      />
      <span className="title-input-error form__message-error">{errors.title}</span>
      <input
        id="link-input" className={`form__text formAdd__text formAdd__text_link ${!isValidInputs.link && 'form__text_error'}`} type="url" name="link" placeholder="Ссылка на картинку"
        required onChange={handleChange} value={values.link || ''}
      />
      <span className="link-input-error form__message-error">{errors.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup