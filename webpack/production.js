const path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: [
        'babel-polyfill',
        path.resolve('./src/index')
    ],

    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve('./docs'),
        publicPath: './'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|png|gif|mp3|aac|ogg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer()
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },

    resolve: {
        alias: {
            actions: path.resolve('./src/actions'),
            assets: path.resolve('./src/assets'),
            components: path.resolve('./src/components'),
            configs: path.resolve('./src/configs'),
            containers: path.resolve('./src/containers'),
            core: path.resolve('./src/core'),
            layouts: path.resolve('./src/layouts'),
            middleware: path.resolve('./src/middleware'),
            reducers: path.resolve('./src/reducers')
        },
        extensions: [
            '.js'
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['docs'], {
            root: path.resolve('.'),
            exclude: ['.readme.md']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/assets/index.html'),
            favicon: path.resolve('./src/assets/favicon.ico'),
            filename: path.resolve('./docs/index.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'DEV_TOOL': JSON.stringify('disable')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            mangle: false,
            compress: true,
            comments: false
        }),
        new ExtractTextPlugin('[name].[md5:contenthash:hex:20].min.css')
    ]
};
