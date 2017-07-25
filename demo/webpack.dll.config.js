/**
 * Created by liuchungui on 16/12/4.
 */
const path = require('path')  
const webpack = require('webpack')  


module.exports = {
    //入口文件
    entry: {
        vendor : [
            'jquery',
        ]    // 引入并打包三方插件
    },

    //生成的文件配置
    output: {
        //生成文件的路径,__dirname是当前项目路径,与webpack.config.js同级
        path:  path.join(__dirname, "dist"),
        filename: "./js/Dll.js",
        library: "[name]_[hash]"
    },
    plugins:[
        
        new webpack.DllPlugin({  
            path: path.join(__dirname, "dist", "./js/manifest.json"),  
            name: "[name]_[hash]",  
            context: __dirname  
        }),
        //压缩打包文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};