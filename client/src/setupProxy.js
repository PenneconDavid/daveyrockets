const { createProxyMiddleware } = require("http-proxy-middleware");
const { PROXY_HOST, PROXY_PORT, NODE_ENV } = require("./config");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.API_URL || "http://localhost:3002", // Adjust according to your API URL
      changeOrigin: true,
      secure: false,
    })
  );
};
