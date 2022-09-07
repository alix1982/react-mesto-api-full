import React from 'react';

function ImagePopup (props) {
  return (
    <section className={"popup popupImg " + (props.card.name && ('popup_opened'))} aria-label="попап картинок" onClick = {props.onCloseOverlay}>
      <div className="popupImg__cell">
        <button className="popup__close" type="button" onClick = {props.onClose}>
        </button>
        <img className="popupImg__img" src={props.card.link} alt={props.card.name}/>
        <p className="popupImg__text">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup
