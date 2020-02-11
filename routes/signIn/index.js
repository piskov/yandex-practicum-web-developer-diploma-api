const signIn = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../../controllers/users');


signIn.post('/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(3).max(254),
      password: Joi.string().required().min(8).max(2048),
    }),
  }),
  login);

module.exports = signIn;
