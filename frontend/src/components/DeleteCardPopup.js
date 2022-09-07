import {useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useFormWithValidation} from './formValidation.js';

function DeleteCardPopup (props) {
  const {isValid, setIsValid} = useFormWithValidation();
  
  useEffect(()=>{if (props.isOpen) {setIsValid(true)}},[props.isOpen]);
  
  function handleOnSubmit (e) {
    e.preventDefault();
      props.onTextButtonSubmit("Удаление...");
      props.onCardDelete(props.card);
  }
  return(
    <PopupWithForm name="Del" title="Вы уверены?" 
      buttonText={props.onTextButton} 
      isValid={isValid}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onCloseOverlay = {props.onCloseOverlay}
      onSubmit = {handleOnSubmit}
    />
  )
}

export default DeleteCardPopup