const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(commonConfig, {
	watch: true,
	devtool: 'eval',
	entry: {
		app: [ './client/src/index.tsx' ]
	},
	output: {
		filename: 'js/app.js'
	},
	devServer: {
		contentBase: './client/public',
		historyApiFallback: false,
		stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
		watch: true
	},
	/*
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }  
    })
  ]*/
	optimization: {
		minimize: true,
		minimizer: [ new UglifyJsPlugin() ]
	}
});
