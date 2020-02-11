const routes = require('express').Router();

const auth = require('../middlewares/auth');

const articles = require('./articles');
const signIn = require('./signIn');
const signUp = require('./signUp');
const users = require('./users');


routes.use('/signup', signUp);
routes.use('/signin', signIn);

// ↓ password protection
routes.use('/articles', auth, articles);
routes.use('/users', auth, users);

module.exports = routes;
