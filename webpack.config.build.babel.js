import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import htmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import base from './webpack.config.babel';
import websiteJson from './config/website.json';

const webpackBuildConfig = {
	entry: (() => {
		for (const key in base.entry) {
			if ({}.hasOwnProperty.call(base.entry, key)) {
				Object.assign(base.entry, {
					[key]: ['babel-polyfill', base.entry[key]],
				});
			}
		}
		return base.entry;
	})(),
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[chunkhash:13].js',
		publicPath: '/todo-list/',
	},
	module: {
		rules: base.module.rules.concat(
			Object.assign(base.module.cssRule, {
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: `${base.module.cssRule.use.css}?minimize=true!${base.module.cssRule.use.postcss}`,
				}),
			})
		),
	},
	plugins: [
		base.plugins.webpackEnvironment,
		base.plugins.loaderOptionsPlugin,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: '[hash:13].js',
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			filename: 'manifest.js',
			minChunks: Infinity,
		}),
		new htmlWebpackInlineSourcePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}),
		// Extract the CSS into a seperate file
		new ExtractTextPlugin('[contenthash:13].css'),
	].concat(base.plugins.htmlWebpackPlugin),
	devtool: false,
};

export default webpackBuildConfig;
