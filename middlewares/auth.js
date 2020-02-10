const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const messageConstants = require('../constants/messageConstants');
const { getJwtSecret } = require('../tools/getJwtSecret');


module.exports = (request, response, next) => {
  const unauthorizedError = new UnauthorizedError(messageConstants.LOGIN_INVALID_EMAIL_OR_PASSWORD);

  const { token } = request.cookies;
  if (!token) {
    next(unauthorizedError);
    return;
  }

  try {
    request.user = jwt.verify(token, getJwtSecret());
  } catch (err) {
    next(unauthorizedError);
    return;
  }

  next();
};
