import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './Api.js';

export function useApiAuth () {
  let navigate = useNavigate();
  function register (password, email, urlApi, urlRoute, setIsRegisterSuccessOpen, setIsRegisterSuccess) {
    return fetch(`${BASE_URL}${urlApi}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((response) => {
        if (response.ok) {return response.json()}
        else {
          setIsRegisterSuccess({
            classIcon: 'popupInfoTooltip__iconNotSuccessfully',
            text: 'Что-то пошло не так! Попробуйте ещё раз.'
          })
          setIsRegisterSuccessOpen(true);
          navigate(urlRoute);
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }
  // поменять `${BASE_URL}/users/me` для локального сервера 'https://auth.nomoreparties.co/users/me'
  const checkToken = () => {
    return fetch (`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
    })
  }
  return {register, checkToken}
}
