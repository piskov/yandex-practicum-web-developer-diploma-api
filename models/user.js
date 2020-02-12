const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const UnauthorizedError = require('../errors/unauthorizedError');
const messageConstants = require('../constants/messageConstants');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, messageConstants.VALIDATION_USER_EMAIL_REQUIRED],
    unique: true,
    validate: {
      validator: (input) => validator.isEmail(input),
      message: () => messageConstants.VALIDATION_USER_EMAIL_INVALID,
    },
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 2048,
    required: [true, messageConstants.VALIDATION_USER_PASSWORD_REQUIRED],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, messageConstants.VALIDATION_USER_NAME_LENGHT],
    maxlength: [30, messageConstants.VALIDATION_USER_NAME_LENGHT],
    required: [true, messageConstants.VALIDATION_USER_NAME_REQUIRED],
  },
});

userSchema.options.toJSON = {
  transform(user) {
    const doc = user.toJSON({ transform: false });

    delete doc._id;
    delete doc.__v;
    delete doc.password;

    return doc;
  },
};

function findUserByCredentials(email, password) {
  const badCredentialsError = new UnauthorizedError('Неправильные почта или пароль');

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw badCredentialsError;
      }

      return bcrypt.compare(password, user.password)
        .then((isPasswordCorrect) => {
          if (!isPasswordCorrect) {
            throw badCredentialsError;
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
