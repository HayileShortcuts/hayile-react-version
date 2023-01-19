const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { resolve } from './src/index.html';

module_exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: [
                        "babel-loader",
                    ],
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    }
}