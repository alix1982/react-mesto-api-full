// module.exports.cors = (req, res, next) => {
//   const allowedCors = [
//     'https://alix576.nomorepartiesxyz.ru',
//     'https://alix576.nomorepartiesxyz.ru/sign-up',
//     'https://api.alix576.nomorepartiesxyz.ru',
//     'https://api.alix576.nomorepartiesxyz.ru/sign-up',
//     'https://mesto.nomoreparties.co/v1/cohort-42',
//     'http://praktikum.tk',
//     'localhost:3000',
//   ];
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const { method } = req;
//   const { origin } = req.headers;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   next();
//   return 1;
// };

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
