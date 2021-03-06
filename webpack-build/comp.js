// Configuration of generating compressed `mouselog.min.js`
const path = require("path");
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var PACKAGE = require('../package.json');
var now = new Date();
var banner = `Mouselog Agent - v${PACKAGE.version} | ${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} | MIT`;

module.exports = {
    mode: "production",
    entry: ["isomorphic-fetch", "../src/webpack_entry.js"],
    output: {
        filename: "mouselog.min.js",
        path: path.resolve(__dirname, "../build"),
        libraryTarget: "umd",
        library: "mouselog"
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                compress: {
                    drop_console: true
                }
            }
        })],
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env"/*, {
                                // Must declare "modules":"commonjs" if CommonJS styles import/export are used
                                // https://github.com/webpack/webpack/issues/4039
                                "modules": "commonjs"
                            }*/]
                        ],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
}