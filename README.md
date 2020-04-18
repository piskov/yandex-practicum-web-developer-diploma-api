# API for Diploma work at Yandex Web developer course
This repo contains code for the News Explorer API. You’ll need NPM, MongoDB, and IDE to use it.

Project contains two build configurations:
- `npm run dev` starts in hot-reload mode
- `npm run start` start without hot-reload

`.env` file is configured to store the production JWT sign key.

Dev build defaults to `http://localhost:3000/` and `mongodb://localhost:27017/newsExplorerDb`.

## API description:
- `POST /signup` creates new user with `{ email, password, name }`
- `POST /signin` with `{ email, password }` — return http-only 7-day cookie with JWT
- `GET /users/me` return info about current user
- `POST /articles` saves article with `{ keyword, title, text, date, source, link, image }`
- `GET /articles` returns saved articles for the current user
- `DELETE /articles/{articleId}` deletes article by ID (if user owns the it)

## Production server .env-file required contents
```
NODE_ENV=production
JWT_SECRET=…
MONGO_ADDRESS=…
```
