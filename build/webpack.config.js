const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  entry: {
    main: path.resolve(__dirname, '../src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                      chrome: '95'
                    }
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            },
          },
        ],
      },
      {
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			}
    ]
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new HtmlWebpackPlugin({
      index: 'index.html',
      template: path.resolve(__dirname, '../template.html'),
    }),
  ]
}
