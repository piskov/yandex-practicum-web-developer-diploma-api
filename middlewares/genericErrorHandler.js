const messageConstants = require('../constants/messageConstants');


module.exports = (error, request, response, next) => {
  const { statusCode = 500 } = error;
  let { message } = error;

  if (statusCode === 500) {
    message = messageConstants.GENERIC_SERVER_ERROR;
  }

  response.status(statusCode).send({ message });
};
