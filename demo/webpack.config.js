/**
 * Created by liuchungui on 16/12/4.
 */
const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


var APP_PATH = path.resolve(__dirname, './main.js');
var BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    //入口文件
    entry: {
        app : APP_PATH,   // 已多次提及的唯一入口文件
    },

    //生成的文件配置
    output: {
        //生成文件的路径,__dirname是当前项目路径,与webpack.config.js同级
        path: BUILD_PATH,
        //文件名
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.(jpg|png)$/, loader:'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }
            
        ],
        
    },
    plugins:[
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        //压缩打包文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 自动生成html
        new HtmlWebpackPlugin({
            title: '欢喜首映',
            filename: 'index.html',
            template:__dirname+'/app/index.html'
        }),
        // 设置生成css 的路径和文件名，会自动将对应entry入口js文件中引入的CSS抽出成单独的文件
        new ExtractTextPlugin('css/[name].min.css')
    ]
};