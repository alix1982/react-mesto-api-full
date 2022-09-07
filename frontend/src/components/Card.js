import React from 'react';

function Card (props) {
  function handleClick() {
    props.onSelectedCard(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const isOwn = props.card.owner._id === props.user._id;
  const buttonDeleteClassName = (`element__del ${isOwn && 'element__del_active'}`);
  const isLiked = props.card.likes.some(like => like._id === props.user._id);
  const buttonLikeClassName = (`element__like ${isLiked && 'element__like_active'}`);
  
  return (
    <li className="element__list">
      <img className="element__img" src ={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <button className= {buttonDeleteClassName} type="button" onClick={handleDeleteClick}></button>
      <div className="element__item">
        <p className="element__text">{props.card.name}</p>
        <button className= {buttonLikeClassName} type="button" onClick={handleLikeClick}>
          <p className="element__like_counter">{props.card.likes.length}</p>
        </button>
      </div>
    </li>
    
  )
}

export default Card