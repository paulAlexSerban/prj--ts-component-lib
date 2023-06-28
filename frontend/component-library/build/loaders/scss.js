const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const scss = {
    // use CSS and Sass loaders to compile CSS stylesheets
    test: /\.(sa|sc|c)ss$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              additionalData: `$assetsPath: '${process.env.ASSETS_PATH}';`
            },
          },
    ],
};

module.exports = scss;
