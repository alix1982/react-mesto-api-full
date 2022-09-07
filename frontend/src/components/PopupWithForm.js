import {useEffect} from 'react';

function PopupWithForm (props) {

  useEffect(()=> {
    function onCloseEsc (evt) {evt.key === 'Escape' && props.onClose()}
      document.addEventListener('keydown', onCloseEsc);
      return () => {!props.isOpen && document.removeEventListener('keydown', onCloseEsc)}
  })

  return(
    <section className={`popup popup${props.name} ${(props.isOpen && 'popup_opened')}`} onClick = {props.onCloseOverlay}>
      <div className={`popup${props.name}__cell`}>
        <button className="popup__close" type="button" onClick = {props.onClose}>
        </button>
        <form className={`form form${props.name}`} name={`form${props.name}`} type="submit" onSubmit={props.onSubmit} noValidate >
          <h2 className={`popup${props.name}__heading`}>{props.title}</h2>
          {props.children}
          <button className={`form__save form${props.name}__save ${!props.isValid && 'form__save_disable'}`} disabled={!props.isValid} >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm