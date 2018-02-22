var Encore = require('@symfony/webpack-encore');
const path = require('path');
var glob = require('glob');
const copyWebpackPlugin = require('copy-webpack-plugin');

Encore
  .setOutputPath('../../../public/build/')
  .setPublicPath('/build')
  .cleanupOutputBeforeBuild()
  
  .addEntry('js/vendor', [
    './node_modules/ribs-checkbox/dist/js/ribs-checkbox.js',
    './node_modules/ribs-flash-message/dist/js/ribs-flash-message.js',
  ])
  
  .addEntry('js/main', [
    './assets/js/main.js',
    './assets/js/form_blocks/inputs.js',
  ])
  
  .addEntry('js/login', [
    './assets/js/login/particles.js',
    './assets/js/login/app.js'
  ])
  
  .addStyleEntry('css/vendor', [
    './node_modules/ribs-checkbox/dist/css/style.css',
    './node_modules/ribs-flash-message/dist/css/style.css',
  ])
  
  .addStyleEntry('css/style', [
    './assets/scss/style.scss'
  ])
  
  .addLoader({
    test: /\.js$/,
    exclude: /node_modules/,
    include: [
      path.join(__dirname, 'assets/'),
    ],
    loader: 'babel-loader',
  })
  
  .enableSassLoader()
  
  .addPlugin(new copyWebpackPlugin([
    {from: './node_modules/tinymce/plugins', to: './plugins'},
    {from: './node_modules/tinymce/themes', to: './themes'},
    {from: './node_modules/tinymce/skins', to: './skins'},
  ]))
  
  .autoProvideVariables({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  })
  
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning()
;

module.exports = Encore.getWebpackConfig();