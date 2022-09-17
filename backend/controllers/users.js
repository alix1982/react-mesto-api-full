const bcrypt = require('bcryptjs');
// const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const IncorrectDataErrorStatus = require('../errors/incorrectDataErrorStatus');
const NoDateErrorStatus = require('../errors/noDateErrorStatus');
const ConflictUser = require('../errors/conflictUser');
const NoAuthErr = require('../errors/noAuthErr');
// const DefaultErrorStatus = require('../errors/defaultErrorStatus');

// const app = express();

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      const userRes = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      };
      res.send(userRes);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataErrorStatus('Ошибка валидации'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictUser('Такой пользователь уже существует'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка'));
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NoDateErrorStatus('Пользователь не найден!');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataErrorStatus('Некорректный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NoDateErrorStatus('Пользователь не найден!'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка!'));
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NoDateErrorStatus('Пользователь не найден!');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataErrorStatus('Ошибка валидации'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NoDateErrorStatus('Пользователь не найден!'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка!'));
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NoDateErrorStatus('Пользователь не найден!');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataErrorStatus('Ошибка валидации'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NoDateErrorStatus('Пользователь не найден!'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка!'));
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new NoAuthErr('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NoAuthErr('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
            { expiresIn: '7d' },
          );
          // const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          res.send({ token, message: 'Всё верно!' });
        });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(new NoAuthErr('Неправильные почта или пароль'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка'));
      next(err);
    });
};
