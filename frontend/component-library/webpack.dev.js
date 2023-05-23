// import required dependencies
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const constants = require("./paths");

// export webpack configuration
module.exports = (env) =>
    merge(common, {
        mode: constants.NODE_ENV,
        devtool: "source-map",
        devServer: {
            port: 9000,
            compress: true,
            static: {
                directory: constants.DIST_DIR,
            },
            devMiddleware: {
                index: "index.html",
                writeToDisk: true,
            },
            client: {
                overlay: true,
            },
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024,
                        },
                    },
                    generator: {
                        filename: "./images/[name][ext]",
                    },
                },
            ],
        },
    });
