var Encore = require('@symfony/webpack-encore');
const path = require('path');
var glob = require('glob');

Encore
	.setOutputPath('../../../web/build/')
	.setPublicPath('/build')
	.cleanupOutputBeforeBuild()
    
    .addEntry("js/vendor", [
        "./node_modules/jquery/dist/jquery.min.js"
    ])
	
	.addEntry("js/main", [
		"./assets/js/form_blocks/inputs.js",
		"./assets/js/popups/flash-messages.js"
	])
	
	.addStyleEntry("css/style", [
		"./assets/scss/style.scss"
	])
    
    .addEntry("js/login", [
        "./assets/js/login/particles.js",
        "./assets/js/login/app.js"
    ])
	
	.enableSassLoader()
    
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    })
    
    .enableSourceMaps(!Encore.isProduction())
	.enableVersioning()
;

module.exports = Encore.getWebpackConfig();