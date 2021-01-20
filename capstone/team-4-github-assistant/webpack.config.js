const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


function gzipMaxCompression(buffer, done) {
	return zlib.gzip(buffer, { level: 9 }, done);
}

const helpers = require('./config/helpers');

module.exports = {
	entry: './client/src/index.tsx',
	watch: true,
	resolve: {
		extensions: [ '.ts', '.tsx', '.js' ]
	},

	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.min.js'
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},

			{
				test: /.(png|woff(2)?|eot|jpg|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				loader: 'url-loader?limit=100000'
			},

			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},

			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
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
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/public/index.html',
			inject: 'body'
		}),

		new ExtractTextPlugin({
			filename: 'css/application.css'
		}),

		new CopyPlugin([
			{
				from: helpers.root('client/public')
			}
		]),
		new BaseHrefWebpackPlugin({ baseHref: '/' }),
		new CompressionPlugin()
		 
	]
};
