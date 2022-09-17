import {useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useFormWithValidation} from './formValidation.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  const userContext = useContext(CurrentUserContext);
  const { values, errors, isValid, isValidInputs, setValues, handleChange, resetForm, setIsValidInputs} = useFormWithValidation();
  useEffect(()=>{
    if (props.isOpen) {
      resetForm();
      setValues(userContext);
      setIsValidInputs({
        name: true,
        about: true
      })
    }
  }, [userContext, props.isOpen]);

  function handleOnSubmit (e) {
    e.preventDefault();
      props.onTextButtonSubmit("Сохранение...")
      props.onUpdateUser(values);
  }

  return (
    <PopupWithForm  name="Info" title="Редактировать профиль" 
      buttonText= {props.onTextButton} 
      isValid={isValid}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {handleOnSubmit}
    >
      <input
        id="name-input" className={`form__text formInfo__text formInfo__text_name ${!isValidInputs.name && 'form__text_error'}`} type="text" name="name" placeholder="Жак-Ив Кусто"
        minLength="2" maxLength="40" required onChange={handleChange} value={values.name || ''}
      />
      <span className="name-input-error form__message-error">{errors.name}</span>
      <input 
        id="work-input" className={`form__text formInfo__text formInfo__text_work ${!isValidInputs.about && 'form__text_error'}`} type="text" name="about" placeholder="Исследователь океана"
        minLength="2" maxLength="200" required onChange={handleChange} value={values.about || ''}
      />
      <span className="work-input-error form__message-error">{errors.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
