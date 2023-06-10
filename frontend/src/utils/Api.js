export class Api {
  constructor(setting) {
    this.baseUrl = setting.baseUrl;
    this.headers = setting.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  getStartData() {
    return Promise.all([this.getUsers(), this.getInitialCards()]);
  }
  
  updateProfile(name, profession) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then(this._checkResponse);
  }

  createCard(cardProperties) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardProperties.name,
        link: cardProperties.link,
      }),
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}


const api = new Api({
  baseUrl: "http://api.miimesto.nomoredomains.rocks",
  headers: {    
    "Content-Type": "application/json",
  },
});

export default api;
