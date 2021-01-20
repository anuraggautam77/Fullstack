const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';
module.exports = {
	entry: {
		app: [ helpers.root('client/src/index.tsx') ],
		vendor: [ 'react', 'react-dom', 'react-router', 'react-router-dom' ]
	},

	output: {
		path: helpers.root('dist'),
		publicPath: '/'
	},

	resolve: {
		extensions: [ '.js', '.tsx', '.json', '.css', '.scss', '.html' ],
		alias: {
			app: 'client/src'
		}
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/
			},

			{
				test: /.(png|woff(2)?|eot|jpg|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				loader: 'url-loader?limit=100000'
			},

			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},

			// SCSS files
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [ autoprefixer ]
							}
						},
						'sass-loader'
					]
				})
			}
		]
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	plugins: [
		/* new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), */

		new HtmlWebpackPlugin({
			template: helpers.root('client/public/index.html'),
			inject: 'body'
		}),

		new ExtractTextPlugin({
			filename: 'css/application.css'
		}),

		new CopyWebpackPlugin([
			{
				from: helpers.root('client/public')
			}
		])
	]
};
