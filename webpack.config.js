var Encore = require('@symfony/webpack-encore');
const path = require('path');
var glob = require('glob');

Encore
	.setOutputPath('../../../web/build/')
	.setPublicPath('/build')
	.cleanupOutputBeforeBuild()
	
	.addEntry("js/vendor", [
		"./node_modules/jquery/dist/jquery.min.js",
		"./node_modules/ribs-checkbox/dist/js/ribs-checkbox.js",
	])
	
	.addEntry("js/main", [
		"./assets/js/main.js",
		"./assets/js/form_blocks/inputs.js",
		"./assets/js/popups/flash-messages.js"
	])

    .addEntry("js/login", [
        "./assets/js/login/particles.js",
        "./assets/js/login/app.js"
    ])

    .addStyleEntry("css/vendor", [
        './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
        './node_modules/ribs-checkbox/dist/css/style.css',
    ])
	
	.addStyleEntry("css/style", [
		"./assets/scss/style.scss"

	])

    .addLoader({
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'assets/'),
        use: [{
            loader: 'babel-loader',
        }],
    })
	
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