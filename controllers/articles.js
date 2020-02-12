const { ObjectId } = require('mongoose').Types;

const Article = require('../models/article');

const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

const messageConstants = require('../constants/messageConstants');


module.exports.createArticle = (request, response, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = request.body;

  const owner = request.user._id;

  const articleModel = new Article({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  });

  const validationErrors = articleModel.validateSync();
  if (validationErrors) {
    const errorMessage = Object.values(validationErrors.errors)
      .map((error) => error.message);

    next(new BadRequestError(errorMessage));
    return;
  }

  Article.create(articleModel)
    .then((article) => {
      response.send({ data: article });
    })
    .catch(next);
};

module.exports.deleteArticle = (request, response, next) => {
  const { articleId } = request.params;

  if (!ObjectId.isValid(articleId)) {
    next(new BadRequestError(messageConstants.ARTICLES_DELETE_INVALID_ARTICLE_ID));
    return;
  }

  Article.findById(articleId)
    .then((article) => {
      if (article === null) {
        throw new NotFoundError(messageConstants.ARTICLES_DELETE_NO_ARTICLE_WITH_ID);
      }

      if (!article.owner.equals(request.user._id)) {
        throw new ForbiddenError(messageConstants.ARTICLES_DELETE_ARTICLE_IS_NOT_YOURS);
      }
    })
    .then(() => {
      Article.findByIdAndDelete(articleId)
        .then((article) => {
          if (article === null) {
            throw new NotFoundError(messageConstants.ARTICLES_DELETE_NO_ARTICLE_WITH_ID);
          }

          return response.json({ data: article });
        });
    })
    .catch(next);
};

module.exports.getArticles = (request, response, next) => {
  Article.find({ owner: request.user._id })
    .then((articles) => response.send({ data: articles }))
    .catch(next);
};
