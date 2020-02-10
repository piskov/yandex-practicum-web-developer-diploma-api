const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');

const NotFoundError = require('./errors/notFoundError');

const auth = require('./middlewares/auth');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');

const { createUser, login } = require('./controllers/users');
const messageConstants = require('./constants/messageConstants');
const routes = require('./routes');
const { getMongoAddress } = require('./tools/getMongoAddress');

require('dotenv').config();


const { PORT = 3000 } = process.env;

mongoose.connect(getMongoAddress(), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(helmet());
app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(requestLogger);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(3).max(254),
      password: Joi.string().required().min(8).max(2048),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(3).max(254),
      password: Joi.string().required().min(8).max(2048),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser);

app.use(auth);
app.use('/', routes);

// 404
app.use((request, response, next) => {
  next(new NotFoundError(messageConstants.ROUTE_NOT_FOUND));
});

app.use(errorLogger);

// celebrate errors
app.use(errors());

// any other errors
app.use((error, request, response, next) => {
  const { statusCode = 500 } = error;
  let { message } = error;

  if (statusCode === 500) {
    message = messageConstants.GENERIC_SERVER_ERROR;
  }

  response.status(statusCode).send({ message });
});

app.listen(PORT, () => { });
