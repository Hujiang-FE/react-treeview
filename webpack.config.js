
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var conditionalCompile = new webpack.DefinePlugin({
    __DEBUG__ : false
})

module.exports = {
    entry: {
        treeview: "./src/entry.js"
    }
    , output: {
        path: __dirname + "/dist",
        filename: '[name].js',
        library: 'ReactTree',
        libraryTarget: 'umd'
    }
    , module: {
        loaders: [            
            {
                test: /\.js$/,
                loader: "babel",
                query:{
                    //blacklist:["strict"]
                }
            }
            ,{ test: /\.css$/, loader: "style!css" }
            // ,{
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract("style-loader","css-loader")
            // }
        ]
    }
    // , plugins: [
    //     new ExtractTextPlugin("[name]" + ".css"),
    //     conditionalCompile
    // ]
};