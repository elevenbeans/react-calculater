
'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var path = require('path');

module.exports = {
    devtool: 'eval-source-map',

    entry: {
        calculater: [   
            'webpack/hot/dev-server',
            __dirname + '/src/entry.jsx'
        ]//唯一入口文件
    },
    output: {
        path: './dist', //打包后的文件存放的地方
        publicPath: '/dist/', //静态资源文件内的请求路径指向静态资源服务器
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    externals: {
        'zepto': 'window.$'
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loader: "jsx!babel", include: /src/},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
            },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },
    devServer: {
        contentBase: './src/views',  //本地服务器所加载的页面所在的目录
        port: 8888,
        colors: true,  //终端中输出结果为彩色
        //historyApiFallback: true,  //不跳转
        inline: true,  
        hot: true //实时刷新
    },
    resolve: {
        root: path.resolve(__dirname, "./src"),
        fallback: [path.resolve(__dirname, './node_modules')],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.HotModuleReplacementPlugin() //同命令行中的 --hot
    ]

}
