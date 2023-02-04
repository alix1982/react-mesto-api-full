# react-mesto-api-full

1. Создание индивидуальной фотогалереи на Java Script и библиотеки React, с сохранением данных на сервере в базе данных MongoDB. Запуск сервера на Node.js c использованием фреймворка Express.

2. Реализована регистрация и вход пользователей по токену, удаление/добавление карточек фотографий, реализация функционала подсчета (добавления и удаления) лайков, форма редактирования профиля, открытие(закрытие) попапов, применение хуков (использование стейт переменных, эффектов, навигации и контекста), в том числе пользовательских, работа с несколькими файлами js, создание сервера, создание базы данных и централизованная обработка ошибок при работе с базой. Сохранение данных в  localStorage и на сервер в базе данных MangoDB, валидация данных на фронтенде и бэкэнде(на уровне схемы и при обращении к контроллеру), использование роутинга на фронте и бэке.

4. Необходимо добавить проверку почту, возможность добавлять карточки и аватар не по ссылке (загрузкой файла).

+ [Ссылка на проект на github](https://github.com/alix1982/react-mesto-api-full)

## Директории

Репозиторий для приложения проекта **Mesto**, включающий фронтенд и бэкенд части приложения. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

Директория `backend/`:

- `/routes` — папка с файлами роутеров,
- `/controllers` — папка с файлами контроллеров пользователя и карточки,
- `/models` — папка с файлами описания схем пользователя и карточки,
- `/middlewares` — папка с файлами проверки авторизации, организации ведедения логов (запросов и ошибок), реализации механизма CORS,
- `/errors` — папка с файлами основных типов ошибок сервера,
- `/utils` — папка утилит.
- остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

### Для запуска проекта удаленно:
- предварительно установить Node.js и MangoDB.
- задать адрес обращения приложения к серверу (задать переменной `BASE_URL` нужный адрес сервера в компоненте `frontend/utils/Api.js` (строка 1)),
- залить проект на облачный сервер:
  - скопировать бекенд часть на сервер через консоль,
  - для копирования фронтенд части использовать `npm run deploy` из директории `frontend/`, предварительно в `frontend/package.json` настроить скрипт `deploy`, изменив в нем имя облачного сервера (изменить `mesto@84.201.157.7`),

- установить зависимости (npm i) отдельно для фронтенда и бекенда,
- установить и настроить работу pm2,
- настроить работу портов сервера (nginx),
- установить сертификаты SSL,
- оставить комментарии в GitHub по совершенствованию проекта.

### Для запуска проекта локально:
- необходимо предварительно установить Node.js и MangoDB.
- клонировать проект c gitHub,
- задать адрес обращения приложения к локальному серверу (задать переменной `BASE_URL` значение 'http://localhost:3001' в компоненте `frontend/utils/Api.js` (строка 1)),
- настроить работу сервера локально на порту 3001 (задать переменной PORT значение 3001 в компоненте `backend/app.js` (строка 6)),
- установить зависимости (npm i) отдельно для фронтенда и бекенда,
- запустить установленную локально базу данных MangoDB (в консоли 'mongod'),
- запустить сервер из папки `backend/`:
  - `npm run start` — запускает сервер   
  - `npm run dev` — запускает сервер в режиме разработки (с hot-reload)

- запустить приложение из папки `frontend/`:
  - `npm run start` — запускает приложение