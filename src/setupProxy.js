const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware(["/api", , "/otherApi"], { target: "https://node-social-backend-1990.herokuapp.com" }));
  };