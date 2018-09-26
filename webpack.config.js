require('babel-polyfill');
const webpack = 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: ['babel-polyfill', path.join(__dirname, 'client/index.js')],
	output: {
		path: path.join(__dirname, '/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html'
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'client/index.js'),
		hot: true
	}
};
// const path = require('path');

// module.exports = {
// 	entry: ['babel-polyfill', path.join(__dirname, 'client/index.js')],
// 	output: { filename: 'bundle.js' },
// 	module: {
// 		rules: [
// 			{
// 				test: [/.jsx?$/, /.js?$/],
// 				exclude: /(node_modules)/,
// 				use: [
// 					{
// 						loader: 'babel-loader',
// 						options: {
// 							presets: ['es2015', 'react']
// 						}
// 					}
// 				]
// 			}
// 		]
// 	},
// 	devtool: 'source-map',
// 	resolve: {
// 		extensions: ['.js', '.jsx']
// 	}
// };
