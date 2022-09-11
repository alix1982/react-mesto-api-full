import { useNavigate } from 'react-router-dom';
// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://api.alix576.nomorepartiesxyz.ru';

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
        console.log(response)
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

  const checkToken = () => {
    return fetch ('api.alix576.nomorepartiesxyz.ru', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
    })
  }
  return {register, checkToken}
}

  