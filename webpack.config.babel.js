import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cssnext from 'postcss-cssnext';
import extend from 'postcss-extend';
import cssImport from 'postcss-import';
import websiteJson from './config/website.json';
import webpackEnv from './config/webpack';
import palette from './config/palette.json';

const webpackBaseConfig = {
	entry: (() => {
		const entryObj = {};

		for (const key in websiteJson.pages) {
			if ({}.hasOwnProperty.call(websiteJson.pages, key)) {
				entryObj[key] = path.join(__dirname, 'src', 'js', websiteJson.pages[key].entry);
			}
		}

		return entryObj;
	})(),
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].[hash:13].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src\/js/,
				use: 'babel-loader',
			},
			{
				test: /\.(jpg|png|gif)$/,
				include: /src\/images/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: `${process.env.NODE_ENV === 'production' ? '' : '[name].'}[hash:13].[ext]`,
				}
			},
			{
				test: /\.svg$/,
				include: /src\/images/,
				use: [
					{
						loader: 'file-loader',
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{ removeTitle: true },
								{ collapseGroups: false },
							],
						},
					},
				],
			},
			{
				test: /\.pug$/,
				include: /src\/view/,
				use: 'pug-loader',
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader',
				options: {
					name: `${process.env.NODE_ENV === 'production' ? '' : '[name].'}[hash:7].[ext]`,
				},
			},
		],
		cssRule: {
			test: /\.css$/,
			include: [
				/src\/css/,
				/node_modules\/font-awesome/,
			],
			use: {
				css: 'css-loader',
				postcss: 'postcss-loader',
			},
		},
	},
	plugins: {
		// webpack environment variables
		webpackEnvironment: new webpack.DefinePlugin({
			'process.env': webpackEnv,
		}),
		htmlWebpackPlugin: (() => {
			/**
			 * return a html object
			 */
			const htmlWebpackObj = (page) => (
				new HtmlWebpackPlugin({
					template: `src/view/${page}.pug`,
					inject: 'body',
					filename: `${page}.html`,
					minify: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						minifyCSS: true,
						minifyJS: true,
						quoteCharacter: '\'',
						removeComments: true,
						removeEmptyAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
					},
					chunks: ['manifest', 'vendor', page],
					inlineSource: 'manifest.js$',
				})
			);

			/**
			 * generate .html file of each page
			 */
			return Object.keys(websiteJson.pages).map((page) => htmlWebpackObj(page));
		})(),
		loaderOptionsPlugin: new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					extend(),
					cssImport(),
					cssnext({
						features: {
							customProperties: {
								variables: palette,
							},
						},
					}),
				],
			}
		}),

	},
};

export default webpackBaseConfig;
