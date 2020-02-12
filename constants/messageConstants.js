module.exports = Object.freeze({
  ARTICLES_DELETE_INVALID_ARTICLE_ID: 'Неверный id статьи',
  ARTICLES_DELETE_NO_ARTICLE_WITH_ID: 'Нет статьи с таким id',
  ARTICLES_DELETE_ARTICLE_IS_NOT_YOURS: 'Статья вам не принадлежит',

  GENERIC_SERVER_ERROR: 'На сервере произошла ошибка',
  LOGIN_INVALID_EMAIL_OR_PASSWORD: 'Неправильные почта или пароль',
  ROUTE_NOT_FOUND: 'Запрашиваемый ресурс не найден',

  USERS_CREATE_EMAIL_ALREADY_EXISTS: 'Пользователь с таким email уже существует',
  USERS_GET_NO_USER_WITH_ID: 'Нет пользователя с таким id',
  USERS_LOGIN_NO_PRODUCTION_JWT_ENV: 'На сервере нет .env с production jwt-secret',

  VALIDATION_ARTICLE_DATE_REQUIRED: 'Дата статьи — обязательные данные',
  VALIDATION_ARTICLE_KEYWORD_LENGHT: 'Допустимая длина для ключевого слова: 1…100 символов',
  VALIDATION_ARTICLE_KEYWORD_REQUIRED: 'Ключевое слово — обязательные данные',
  VALIDATION_ARTICLE_LINK_INVALID: 'Некорректная ссылка на статью',
  VALIDATION_ARTICLE_LINK_REQUIRED: 'Ссылка на статью — обязательные данные',
  VALIDATION_ARTICLE_PHOTO_LINK_INVALID: 'Некорректная ссылка на фотографию',
  VALIDATION_ARTICLE_PHOTO_LINK_REQUIRED: 'Ссылка на фотографию — обязательные данные',
  VALIDATION_ARTICLE_SOURCE_LENGHT: 'Допустимая длина для источника статьи: 2…500 символов',
  VALIDATION_ARTICLE_SOURCE_REQUIRED: 'Источник на статью — обязательные данные',
  VALIDATION_ARTICLE_TEXT_LENGHT: 'Допустимая длина для текста статьи: 1…30000 символов',
  VALIDATION_ARTICLE_TEXT_REQUIRED: 'Текст статьи — обязательные данные',
  VALIDATION_ARTICLE_TITLE_LENGHT: 'Допустимая длина для названия: 1…500 символов',
  VALIDATION_ARTICLE_TITLE_REQUIRED: 'Название статьи — обязательные данные',

  VALIDATION_USER_EMAIL_INVALID: 'Некорректный email',
  VALIDATION_USER_EMAIL_REQUIRED: 'Email — обязательные данные',
  VALIDATION_USER_NAME_LENGHT: 'Допустимая длина для имени: 2…30 символов',
  VALIDATION_USER_NAME_REQUIRED: 'Имя — обязательные данные',
  VALIDATION_USER_PASSWORD_REQUIRED: 'Пароль — обязательные данные',
});
