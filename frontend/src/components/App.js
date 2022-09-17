import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import { api } from '../utils/Api.js';
import { useApiAuth } from '../utils/ApiAuth.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopup] = useState(false);
  const [isEditDeletePopupOpen, setIsDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(
    {
      name: 'Жак-Ив Кусто',
      about: 'Иссдедователь океана',
      avatar: '../images/avatar.png'
    }
  );
  const [currentCard, setCurrentCard] = useState([]);
  const [textButtonSubmit, setTextButtonSubmit] =  useState('');
  const [card, setCard] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccessOpen, setIsRegisterSuccessOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState({
    classIcon: 'popupInfoTooltip__iconNotSuccessfully',
    text: 'Что-то пошло не так! Попробуйте ещё раз.'
  });
  const [userEmail, setUserEmail] = useState('')
  const { register, checkToken } = useApiAuth();

  let navigate = useNavigate();

  function onCloseOverlay (evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }
  function closeAllPopups () {
    setIsProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsAvatarPopup(false);
    setIsDeletePopup(false);
    setIsRegisterSuccessOpen(false);
    setIsRegisterSuccess({
      classIcon: 'popupInfoTooltip__iconNotSuccessfully',
      text: 'Что-то пошло не так! Попробуйте ещё раз.'
    })
    setSelectedCard({});
  }

  function handleCheckToken () {
    checkToken () 
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
          navigate("/");
          api.getUser ()
            .then ((res) => { setCurrentUser(res) })
            .catch((err) => {console.log(err)});
          api.getCards ()
            .then ((res) => { setCurrentCard(res) })
            .catch((err) => {console.log(err)});
          return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then((res) => {
        setUserEmail(res.email)
        return res;
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    handleCheckToken();
  }, [])
  
  function handleUpdateUser (currentUser) {
    api.patchUserInfo (currentUser)
      .then ((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .finally (() => {
        setTextButtonSubmit('Сохранение');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleUpdateAvatar (avatarUser){
    api.patchUserAvatar (avatarUser.avatar)
    .then ((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .finally (() => {
      setTextButtonSubmit('Сохранение');
    })
    .catch((err) => {
      console.log(err)
    })
  }
  function handleAddPlace (newCard) {
    api.postAddCard (newCard)
      .then ((res) => {
        setCurrentCard([res, ...currentCard])
        closeAllPopups()
      })
      .finally (() => {
        setTextButtonSubmit('Создать');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCardDelete (card) {
    api.deleteCardDel(card._id, 'DELETE')
      .then (() => {
        setCurrentCard(currentCard => {
          return currentCard.filter( c => {return c._id !== card._id})
        })
        closeAllPopups()
      })
      .finally (() => {
        setTextButtonSubmit('Да');
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCardLike (card) {
    const isLiked = card.likes.some(like => like === currentUser._id);
    api.getCounterLike (card._id, (!isLiked ? 'PUT' : 'DELETE'))
      .then((newCard) => {
        setCurrentCard(currentCard => {
          return currentCard.map( c => {return c._id === card._id ? newCard : c})
        });
      })
      .catch((err) => {
        console.log(err)
      });
  }
  function apiLogin (password, email) {
    register(password, email, '/signin', '/sign-in', setIsRegisterSuccessOpen, setIsRegisterSuccess)
      .then((res) => {
        if (!(res===undefined)) {
          localStorage.setItem('token', res.token);
          handleCheckToken();
          setUserEmail(email);
        }
        return res;
      })
      .catch((err) => console.log(err));
  }
  function apiRegister (password, email) {
    register(password, email, '/signup', '/sign-up', setIsRegisterSuccessOpen, setIsRegisterSuccess)
      .then((res) => {
        if (!(res===undefined)) {
          setIsRegisterSuccessOpen(true);
          setIsRegisterSuccess({
            classIcon: 'popupInfoTooltip__iconSuccessfully',
            text: 'Вы успешно зарегистрировались!'
          })
          navigate("/sign-in");
        }
        return res;
      })
      .catch((err) => console.log(err));
  }
  function handleOnClick () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/sign-in");
  }
  function handleOnEditProfile () {
    setIsProfilePopup(true);
    setTextButtonSubmit('Сохранение')
  }
  function handleOnAddPlace () {
    setIsAddPlacePopup(true);
    setTextButtonSubmit('Создать')
  }
  function handleOnEditAvatar () {
    setIsAvatarPopup(true);
    setTextButtonSubmit('Сохранение')
  }
  function handleOnCardDelete(card) {
    setIsDeletePopup(true);
    setTextButtonSubmit('Да');
    setCard(card);
  }
  function handleNavigateRegister () {
    navigate("/sign-in")
  }
  function handleNavigateLogin () {
    navigate("/sign-up")
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <div className="page">
            <ProtectedRoute loggedIn={loggedIn} button='Выйти' user={userEmail} component={Header}
              onClick={handleOnClick} 
              />
            <ProtectedRoute loggedIn={loggedIn} component={Main}
              onEditProfile = {handleOnEditProfile}
              onAddPlace = {handleOnAddPlace}
              onEditAvatar = {handleOnEditAvatar}
              onCardDelete={handleOnCardDelete}
              onCardLike = {handleCardLike}
              onSelectedCard = {setSelectedCard}
              onCards = {currentCard}
            />
            <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
          </div>
          }/>

        <Route path="/sign-up" element={
          <>
            <Header button='Войти' user='' onClick={handleNavigateRegister}/>
            <Register buttonText='Зарегистрироваться' title='Регистрация' onApi={apiRegister}/>
          </>
        }/>

        <Route path="/sign-in" element={
          <>
            <Header button='Регистрация' user='' onClick={handleNavigateLogin}/>
            <Login buttonText='Войти' title='Вход' onApi={apiLogin}/>
          </>
        }/>
      </Routes>

      <InfoTooltip classIcon={isRegisterSuccess.classIcon} text={isRegisterSuccess.text} 
        isOpen = {isRegisterSuccessOpen} 
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
      />

      <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
        onUpdateUser = {handleUpdateUser}
        onTextButtonSubmit = {setTextButtonSubmit}
        onTextButton = {textButtonSubmit}
      />

      <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
        onAddPlace = {handleAddPlace}
        onTextButtonSubmit = {setTextButtonSubmit}
        onTextButton = {textButtonSubmit}
      />

      <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
        onUpdateAvatar = {handleUpdateAvatar}
        onTextButtonSubmit = {setTextButtonSubmit}
        onTextButton = {textButtonSubmit}
      />

      <DeleteCardPopup
        isOpen = {isEditDeletePopupOpen}
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
        onCardDelete = {handleCardDelete}
        onTextButtonSubmit = {setTextButtonSubmit}
        onTextButton = {textButtonSubmit}
        card = {card}
      />

      <ImagePopup 
        onClose = {closeAllPopups}
        onCloseOverlay = {onCloseOverlay}
        card = {selectedCard}>
      </ImagePopup>
    </CurrentUserContext.Provider>
  );
}


export default App;
