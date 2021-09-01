const { createProxyMiddleware } = require('http-proxy-middleware');

  module.exports = app => {
    app.use(proxy("/api/*", { target: "https://node-social-backend-1990.herokuapp.com/" }));
  };