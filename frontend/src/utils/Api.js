class Api {
  constructor ({url, heading})
  {
    this.url = url;
    this.heading = heading
  }

  _getStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  patchUserInfo = (inputList) => {
    return (fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.heading,
      body: JSON.stringify({
        name: inputList.name,
        about: inputList.about,
        //avatar: inputList.linkAvatar,
      })
    })
      .then(res => this._getStatus(res))
    );
  }

  postAddCard = (inputList) => {
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
    return (fetch (`${this.url}/cards/${itemId}`, {
        method: method,
        headers: this.heading,
      })
      .then(res => this._getStatus(res))
    )
  }

  getCounterLike = (itemId, method) => {
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
    return (fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: this.heading
    })
      .then(res => this._getStatus(res))
    ); 
  }

  getUser = () => {
    return (fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.heading
    })
      .then(res => this._getStatus(res))
    )
  }
}

const api = new Api (
  {
    url: 'https://mesto.nomoreparties.co/v1/cohort-42',
    heading: {
      authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
      'Content-Type': 'application/json'
    }
  }
);

export default api