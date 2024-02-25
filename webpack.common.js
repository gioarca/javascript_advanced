// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  {
    entry: {
        main: "./src/index.js",
    },
    
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                use:{
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            },
        
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ]
    }
}
