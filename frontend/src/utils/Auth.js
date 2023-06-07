export const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  if (res.ok) {
  return  res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const login = (authData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",    
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
    }),
  }).then(checkResponse);
};

export const register = (authData) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
    }),
  }).then(checkResponse);
};

export const getAuthData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
