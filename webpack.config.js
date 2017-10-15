var Encore = require('@symfony/webpack-encore');
const path = require('path');
var glob = require('glob');

Encore
	.setOutputPath('../../../web/build/')
	.setPublicPath('/build')
	.cleanupOutputBeforeBuild()
	
	.addStyleEntry("css/style", [
		"./assets/scss/style.scss"
	])
	
	.enableSassLoader()
	.enableSourceMaps(!Encore.isProduction())
	.enableVersioning()
;

module.exports = Encore.getWebpackConfig();