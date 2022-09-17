const express = require('express');
require('dotenv').config();
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorRouter = require('./routes/errors');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { link } = require('./utils/regulatoryExpression');
const IncorrectDataErrorStatus = require('./errors/incorrectDataErrorStatus');
const NoDateErrorStatus = require('./errors/noDateErrorStatus');
const ConflictUser = require('./errors/conflictUser');
const NoAuthErr = require('./errors/noAuthErr');
const DefaultErrorStatus = require('./errors/defaultErrorStatus');
const ConflictId = require('./errors/conflictId');

const cors = require('./middlewares/cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(requestLogger);

app.use(cors);

// удалить
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// !

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(link),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/', userRouter);

app.use('/', cardRouter);

app.use('/', errorRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    next(new ConflictUser('Такой пользователь уже существует'));
    return;
  }
  if (err.name === 'ValidationError') {
    next(new IncorrectDataErrorStatus('Ошибка валидации!'));
    return;
  }
  if (err.name === 'CastError') {
    next(new IncorrectDataErrorStatus('Некорректный id'));
    return;
  }
  if (err.statusCode === 401) {
    next(new NoAuthErr('Неправильные почта или пароль'));
    return;
  }
  if (err.statusCode === 403) {
    next(new ConflictId('Удаление не своей карточки'));
    return;
  }
  if (err.statusCode === 404) {
    next(new NoDateErrorStatus('Пользователь(карточка) не найден(а)'));
    return;
  }
  next(new DefaultErrorStatus('На сервере произошла ошибка!'));
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  // next(new DefaultErrorStatus('На сервере произошла ошибка!'));
  // res.status(500).send({ message: 'На сервере произошла ошибка' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
