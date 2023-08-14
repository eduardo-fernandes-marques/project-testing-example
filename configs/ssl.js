/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
const sslRedirect = (environments = ['production'], status = 301) => {
  const currentEnv = process.env.NODE_ENV;
  const isCurrentEnv = environments.includes(currentEnv);
  return (req, res, next) => {
    if (isCurrentEnv && req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    } else next();
  };
};

module.exports = sslRedirect;
