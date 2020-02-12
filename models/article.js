const mongoose = require('mongoose');
const messageConstants = require('../constants/messageConstants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: [1, messageConstants.VALIDATION_ARTICLE_KEYWORD_LENGHT],
    maxlength: [100, messageConstants.VALIDATION_ARTICLE_KEYWORD_LENGHT],
    required: [true, messageConstants.VALIDATION_ARTICLE_KEYWORD_REQUIRED],
  },
  title: {
    type: String,
    minlength: [1, messageConstants.VALIDATION_ARTICLE_TITLE_LENGHT],
    maxlength: [500, messageConstants.VALIDATION_ARTICLE_TITLE_LENGHT],
    required: [true, messageConstants.VALIDATION_ARTICLE_TITLE_REQUIRED],
  },
  text: {
    type: String,
    minlength: [1, messageConstants.VALIDATION_ARTICLE_TEXT_LENGHT],
    maxlength: [30000, messageConstants.VALIDATION_ARTICLE_TEXT_LENGHT],
    required: [true, messageConstants.VALIDATION_ARTICLE_TEXT_REQUIRED],
  },
  date: {
    type: Date,
    required: [true, messageConstants.VALIDATION_ARTICLE_DATE_REQUIRED],
  },
  source: {
    type: String,
    minlength: [2, messageConstants.VALIDATION_ARTICLE_SOURCE_LENGHT],
    maxlength: [500, messageConstants.VALIDATION_ARTICLE_SOURCE_LENGHT],
    required: [true, messageConstants.VALIDATION_ARTICLE_SOURCE_REQUIRED],
  },
  link: {
    type: String,
    match: [
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      messageConstants.VALIDATION_ARTICLE_LINK_INVALID,
    ],
    required: [true, messageConstants.VALIDATION_ARTICLE_LINK_REQUIRED],
  },
  image: {
    type: String,
    match: [
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      messageConstants.VALIDATION_ARTICLE_PHOTO_LINK_INVALID,
    ],
    required: [true, messageConstants.VALIDATION_ARTICLE_PHOTO_LINK_REQUIRED],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

articleSchema.options.toJSON = {
  transform(article) {
    const doc = article.toJSON({ transform: false });

    delete doc.__v;
    delete doc.owner;

    return doc;
  },
};

module.exports = mongoose.model('article', articleSchema);
