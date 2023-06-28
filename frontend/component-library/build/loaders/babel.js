const babel = {
    // use babel to transpile JavaScript code
    test: /\.js$/,

    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
        },
    },
};

module.exports = babel;