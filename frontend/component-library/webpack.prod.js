const { merge } = require("webpack-merge");
// import required dependencies
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const constants = require("./paths");

// export webpack configuration
module.exports = (env) =>
    merge(common, {
        mode: constants.NODE_ENV,
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 3 * 1024, // 3 kilobytes
                        },
                    },
                    generator: {
                        filename: "./images/[name][contenthash:12][ext]",
                    },
                    use: [
                        {
                            loader: "image-webpack-loader",
                            options: {
                                mozjpeg: {
                                    quality: 40,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    compress: { warnings: false },
                    output: { comments: false },
                },
            }),
        ],
    });
