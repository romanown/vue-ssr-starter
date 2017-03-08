const base = require('./base');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pug = require('pug');

const config = Object.assign({}, base, {
	entry: {
		app: './build/entry/client.js',
		vendor: [
			//'babel-polyfill',
			//'axios',
			'vue',
			//'vue-router',
			//'vuex',
			//'vuex-router-sync'
		]
	},
	plugins: (base.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HTMLPlugin({
			template: 'src/layout.pug'
		})
	])
});

if (process.env.NODE_ENV === 'production') {
	let vueConfig = config.module.rules.find(el => el.loader === 'vue-loader');

	vueConfig.options.loaders.stylus = ExtractTextPlugin.extract({
		use: vueConfig.options.loaders.stylus.replace('vue-style-loader!', ''),
		fallback: 'vue-style-loader'
	});

	config.plugins.push(
		new ExtractTextPlugin('styles.[hash].css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);
}
else {
	config.devtool = '#sourcemap';
}

module.exports = config;