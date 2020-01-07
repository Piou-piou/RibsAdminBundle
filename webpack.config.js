var Encore = require('@symfony/webpack-encore');
const path = require('path');
var glob = require('glob');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

Encore
.setOutputPath('./Resources/public/')
.setPublicPath('/bundles/ribsadmin')
.setManifestKeyPrefix('bundles/ribsadmin')



// ----------------------  JS --------------------------------------//
.addEntry('js/vendor', [
  './node_modules/ribs-checkbox/dist/js/ribs-checkbox.js',
  './node_modules/ribs-popup/dist/js/ribs-popup.js',
  './node_modules/ribs-flash-message/dist/js/ribs-flash-message.js',
])

.addEntry('js/main', [
  './assets/js/main.js',
])

.addEntry('js/login', [
  './assets/js/login/particles.js',
  './assets/js/login/app.js'
])


// ----------------------  CSS --------------------------------------//
.addStyleEntry('css/vendor', [
  './node_modules/ribs-admin-bundle-templates/dist/css/style.min.css',
  './node_modules/ribs-popup/dist/css/style.min.css',
  './node_modules/ribs-flash-message/dist/css/style.css',
])

.addStyleEntry('css/style', [
  './assets/scss/style.scss'
])


// ----------------------  Other configs --------------------------------------//

.addPlugin(new ProgressBarPlugin())

.addLoader({
  test: /\.js$/,
  exclude: /node_modules/,
  include: [
    path.join(__dirname, 'assets/'),
  ],
  loader: 'babel-loader',
})

.enableSassLoader()

.autoProvideVariables({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
})

.enableSourceMaps(!Encore.isProduction());

module.exports = Encore.getWebpackConfig();
