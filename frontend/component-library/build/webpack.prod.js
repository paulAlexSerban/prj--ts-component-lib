const { merge } = require("webpack-merge");
// import required dependencies
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const configs = require("./configs");

const { paths } = configs;

// export webpack configuration
module.exports = (env) =>
    merge(common, {
        mode: paths.NODE_ENV,
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
