import React from 'react';

function InfoTooltip (props) {
  return(
    <section className={`popup popupInfoTooltip ${(props.isOpen && 'popup_opened')}`} onClick = {props.onCloseOverlay}>
      <div className="popupInfoTooltip__cell">
        <button className="popup__close" type="button" onClick = {props.onClose}></button>
        <div className={props.classIcon}></div>
        <p className="popupInfoTooltip__text">{props.text}</p>
      </div>
    </section>
  )
}

export default InfoTooltip