module.exports.getJwtSecret = () => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (NODE_ENV === 'production' && JWT_SECRET) {
    return JWT_SECRET;
  }

  if (NODE_ENV === 'development') {
    return 'dev-secret';
  }

  return null; // we’ll throw 500-error if there’s no .env on production server
};
