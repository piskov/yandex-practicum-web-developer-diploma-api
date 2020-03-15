const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/badRequestError');
const InternalServerError = require('../errors/internalServerError');
const NotFoundError = require('../errors/notFoundError');

const messageConstants = require('../constants/messageConstants');
const { getJwtSecret } = require('../tools/getJwtSecret');


module.exports.createUser = (request, response, next) => {
  const { email, password, name } = request.body;
  const userModel = new User({ email, password, name });

  const validationErrors = userModel.validateSync();
  if (validationErrors) {
    const errorMessage = Object.values(validationErrors.errors)
      .map((error) => error.message);

    next(new BadRequestError(errorMessage));
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new BadRequestError(messageConstants.USERS_CREATE_EMAIL_ALREADY_EXISTS);
      }
    })
    .then(() => bcrypt.hash(userModel.password, 10))
    .then((hash) => {
      userModel.password = hash;
    })
    .then(() => User.create(userModel))
    .then((user) => response.send({ data: user }))
    .catch(next);
};

module.exports.getCurrentUser = (request, response, next) => {
  const userId = request.user._id;

  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(messageConstants.USERS_GET_NO_USER_WITH_ID);
      }

      return response.json({ data: user });
    })
    .catch(next);
};

module.exports.login = (request, response, next) => {
  const { email, password } = request.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const jwtSecret = getJwtSecret();

      if (jwtSecret === null) {
        throw new InternalServerError(messageConstants.USERS_LOGIN_NO_PRODUCTION_JWT_ENV);
      }

      const token = jwt.sign(
        { _id: user._id },
        jwtSecret,
        { expiresIn: '7d' },
      );

      response
        .cookie('token', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
          // httpOnly: true,
          // sameSite: true,
        })
        .end();
    })
    .catch(next);
};
