var Encore = require('@symfony/webpack-encore');
const path = require('path');
var glob = require('glob');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

Encore
.setOutputPath('../../public/build/ribs-admin-bundle')
.setPublicPath('/build/ribs-admin-bundle')
.cleanupOutputBeforeBuild()


// ----------------------  JS --------------------------------------//
.addEntry('js/vendor', [
  './node_modules/ribs-admin-bundle-templates/dist/js/index.js',
  './node_modules/ribs-admin-bundle-templates/dist/js/tables.js',
  './node_modules/ribs-checkbox/dist/js/ribs-checkbox.js',
  './node_modules/ribs-popup/dist/js/ribs-popup.js',
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


// ----------------------  CSS --------------------------------------//
.addStyleEntry('css/vendor', [
  './node_modules/ribs-admin-bundle-templates/dist/style.min.css',
  './node_modules/ribs-popup/dist/css/style.min.css',
  './node_modules/ribs-flash-message/dist/css/style.css',
])

/*.addStyleEntry('css/style', [
  './assets/scss/style.scss'
])*/


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
