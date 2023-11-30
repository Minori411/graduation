const { createProxyMiddleware } = require("http-proxy-middleware");
// const { env } = require("process");

// const target = env.ASPNETCORE_HTTPS_PORT
//   ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
//   : env.ASPNETCORE_URLS
//   ? env.ASPNETCORE_URLS.split(";")[0]
//   : "http://localhost:13765";

const context = ["/api/"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: "http://localhost:7256",
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:7256',
//       changeOrigin: true,
//       secure: false
//     })
//   );
// };