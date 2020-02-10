module.exports.getMongoAddress = () => {
  const { NODE_ENV, MONGO_ADDRESS } = process.env;

  if (NODE_ENV === 'production' && MONGO_ADDRESS) {
    return MONGO_ADDRESS;
  }

  if (NODE_ENV === 'development') {
    return 'mongodb://localhost:27017/newsExplorerDb';
  }

  return null;
};
