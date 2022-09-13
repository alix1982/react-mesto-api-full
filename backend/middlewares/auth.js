const jwt = require('jsonwebtoken');
require('dotenv').config();
const NoAuthErr = require('../errors/noAuthErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoAuthErr('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new NoAuthErr('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
