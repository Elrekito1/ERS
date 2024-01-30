// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:5000',  // Altere para o host do seu backend
    changeOrigin: true,
    pathRewrite: {
     
    },
  }));
};
module.exports = setupProxy;