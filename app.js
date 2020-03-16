const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const genericErrorHandler = require('./middlewares/genericErrorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const route404Handler = require('./middlewares/route404Handler');

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

const allowedOrigins = [
  'http://localhost:8080',
  'http://divulge-uncommon.ru',
  'https://divulge-uncommon.ru',
  'https://piskov.github.io',
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(helmet());
app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', routes);
app.use(route404Handler);

app.use(errorLogger);
app.use(errors()); // celebrate errors

app.use(genericErrorHandler);

app.listen(PORT, () => { });
