//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: ['whatwg-fetch','./src/js/GameController.jsx'],
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'out.min.js'
    },
    watch: true, //mozna pominac
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2', 'react'] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",],
            }
        ],
    },
    plugins: [
        // new UglifyJSPlugin({
        //     sourceMap: true
        // })
    ]
};

//const path = require("path");
//
// module.exports = {
//     mode: 'development',
//     entry: "./js/zadanie00.jsx",
//     output: {  path: path.join(__dirname, "./js/"), filename : 'out.js' },
//     watch: true,
//     devtool: "cheap-module-eval-source-map",
//     module: {
//         rules : [{
//             test: /\.jsx$/,  exclude: /node_modules/,
//             loader: 'babel-loader',
//             query: { presets: ['es2015', 'stage-2', 'react'] }
//         }]
//     }
// };