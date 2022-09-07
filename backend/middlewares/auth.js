const jwt = require('jsonwebtoken');
const NoAuthErr = require('../errors/noAuthErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoAuthErr('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new NoAuthErr('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
