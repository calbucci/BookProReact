var config = {
    entry: './source/app.jsx',
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    resolve:{
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devServer:{
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
};

module.exports = config;