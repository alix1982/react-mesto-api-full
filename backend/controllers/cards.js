const Card = require('../models/card');

const IncorrectDataErrorStatus = require('../errors/incorrectDataErrorStatus');
const NoDateErrorStatus = require('../errors/noDateErrorStatus');
const ConflictId = require('../errors/conflictId');
// const DefaultErrorStatus = require('../errors/defaultErrorStatus');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataErrorStatus('Ошибка валидации!'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка создания'));
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  // Card.find({ owner: req.user._id })
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        throw new NoDateErrorStatus('Карточка не найдена');
      }
      if (req.user._id !== card.owner.toString()) {
        throw new ConflictId('Удаление не своей карточки');
      }
      return card.remove();
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataErrorStatus('Некорректный id'));
        return;
      }
      if (err.statusCode === 403) {
        next(new ConflictId('Удаление не своей карточки'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NoDateErrorStatus('Карточка не найдена'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка удалениия'));
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NoDateErrorStatus('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataErrorStatus('Некорректный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NoDateErrorStatus('Карточка не найдена'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка лайка'));
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NoDateErrorStatus('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataErrorStatus('Некорректный id'));
        return;
      }
      if (err.statusCode === 404) {
        next(new NoDateErrorStatus('Карточка не найдена'));
        return;
      }
      // next(new DefaultErrorStatus('Произошла ошибка лайка'));
      next(err);
    });
};
