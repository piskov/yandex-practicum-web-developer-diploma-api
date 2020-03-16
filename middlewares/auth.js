const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');

const messageConstants = require('../constants/messageConstants');
const { getJwtSecret } = require('../tools/getJwtSecret');


module.exports = (request, response, next) => {
  const unauthorizedError = new UnauthorizedError(messageConstants.LOGIN_INVALID_EMAIL_OR_PASSWORD);

  const authHeader = request.headers.authorization;

  if (!authHeader || authHeader.split(' ').length < 2) {
    next(unauthorizedError);
    return;
  }

  const token = authHeader.split(' ')[1];
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
