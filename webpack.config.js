let path = require("path");
let htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/index.js",
   output: {
        path: path.resolve("build"),
       filename: "bundle.js"
   },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
            {test:/\.css$/,use:['style-loader','css-loader']},
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
            { test: /\.(jpg|png|gif|svg|eot|woff2|ttf|woff)$/, use: "url-loader" }
        ]
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html"
        })
    ]

}