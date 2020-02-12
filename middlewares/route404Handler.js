const NotFoundError = require('../errors/notFoundError');
const messageConstants = require('../constants/messageConstants');

module.exports = (request, response, next) => {
  next(new NotFoundError(messageConstants.ROUTE_NOT_FOUND));
};
