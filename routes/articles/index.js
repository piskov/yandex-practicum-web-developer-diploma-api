const articles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { createArticle, deleteArticle, getArticles } = require('../../controllers/articles');

articles.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(1).max(500),
      title: Joi.string().required().min(2).max(500),
      text: Joi.string().required().min(1).max(30000),
      date: Joi.date().timestamp().required(),
      source: Joi.string().required().min(2).max(500),
      link: Joi.string().required().min(3).max(2048),
      image: Joi.string().required().min(3).max(2048),
    }),
  }),
  createArticle);

articles.delete('/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.objectId(),
    }),
  }),
  deleteArticle);

articles.get('/', getArticles);

module.exports = articles;
