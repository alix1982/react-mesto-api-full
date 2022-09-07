import React from 'react';
import logo from '../images/logo-mesto.svg';

function Header (props) {
  return (
    <header className="header">
      <img src= {logo} className="header__logo" alt="Логотип"/>
      <div className="header__user">
        <p className="header__userInfo">{props.user}</p>
        <button onClick={props.onClick} className="header__button">{props.button}</button>
      </div>
    </header>
  )
}

export default Header