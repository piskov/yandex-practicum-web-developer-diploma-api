const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 1000, // 1 second
  max: 1000, // limit each IP to 1000 request
});

module.exports = limiter;
