const path = require('path');

module.exports = {
    // ... rest
  
    devServer: {
      compress: true,
      port: 3000,
  
      // 👇️ set this property
      allowedHosts: 'all',
    },
    mode: 'development', // Defina o modo para 'development' ou 'production'
    entry: './src/index.js', // Arquivo de entrada do seu aplicativo
    output: {
      path: path.resolve(__dirname, 'dist'), // Diretório de saída para os arquivos processados pelo Webpack
      filename: 'bundle.js' // Nome do arquivo de saída
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/, // Expressão regular para arquivos JavaScript e JSX
              exclude: /node_modules/, // Excluir o diretório node_modules
              use: {
                loader: 'babel-loader', // Usar o loader do Babel
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'] // Presets do Babel para transpilar código ES6/ES7 e JSX
                }
              }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            }
          ],
        },
      };