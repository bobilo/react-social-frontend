const { createProxyMiddleware } = require('http-proxy-middleware');

  module.exports = app => {
    app.use(createProxyMiddleware("/api/*", { target: "https://node-social-backend-1990.herokuapp.com/" }));
  };