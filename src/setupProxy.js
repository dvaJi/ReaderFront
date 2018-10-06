const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:8000', ws: true }));
  app.use(proxy('/works', { target: 'http://localhost:8000', ws: true }));
  app.use(proxy('/images', { target: 'http://localhost:8000', ws: true }));
};
