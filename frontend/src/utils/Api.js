class Api {
  constructor ({url, heading})
  {
    this.url = url;
    this.heading = heading;
  }

  _getStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  patchUserInfo = (inputList) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.heading,
      body: JSON.stringify({
        name: inputList.name,
        about: inputList.about,
      })
    })
      .then(res => this._getStatus(res))
    );
  }

  postAddCard = (inputList) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.heading,
      body: JSON.stringify({
        name: inputList.name,
        link: inputList.link
      })
    })
      .then(res => this._getStatus(res))
    )
  };

  patchUserAvatar = (linkAvatar) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.heading,
      body: JSON.stringify({
        avatar: linkAvatar,
      })
    })
      .then(res => this._getStatus(res))
    )
  }

  deleteCardDel = (itemId, method) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch (`${this.url}/cards/${itemId}`, {
        method: method,
        headers: this.heading,
      })
      .then(res => this._getStatus(res))
    )
  }

  getCounterLike = (itemId, method) => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/cards/${itemId}/likes`, {
      method: method,
      headers: this.heading,
      body: JSON.stringify({
      })
    })
      .then(res => this._getStatus(res))
    )
  }

  getCards = () => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: this.heading,
    })
      .then(res => this._getStatus(res))
    );
  }

  getUser = () => {
    this._setJwt(localStorage.getItem('token'));
    return (fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.heading,
    })
      .then(res => this._getStatus(res))
    )
  }
  _setJwt = (token) => {
    this.heading.authorization = `Bearer ${token}`;
  }
}

const api = new Api (
  {
    url: 'http://api.alix576.nomorepartiesxyz.ru',
    heading: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }
);
export default api

// http://api.alix576.nomorepartiesxyz.ru/
// https://mesto.nomoreparties.co/v1/cohort-42
// `Bearer ${localStorage.getItem('token')}`
// 99b7a38f-d2ab-46ce-b602-198a4e9299a5
// heading: {
//   authorization: `Bearer ${localStorage.getItem('token')}`,
//   'Content-Type': 'application/json'
// }
  // let token = localStorage.getItem('token')