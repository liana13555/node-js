/* Middleware для распознания пользователя:
- проверяем прислал ли нам пользователь токен
- декодируем
- записываем в req.user
*/

const jwt = require('jsonwebtoken');
const {NotAuthorizedError} = require('../helpers/errors');

const authMiddleware = (req, res, next) => {
  try {
    // TODO: validate token type later
    const [, token] = req.headers['authorization'].split(' ');
    // console.log(tokenType, token);

    if (!token) {
      next(new NotAuthorizedError('Please, provide a token'));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new NotAuthorizedError('Invalid token'));
  }
};

module.exports = {
  authMiddleware,
};
