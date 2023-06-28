// import required dependencies
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const configs = require("./configs");
const { paths } = configs;

// export webpack configuration
module.exports = (env) =>
    merge(common, {
        mode: paths.NODE_ENV,
        watch: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        stats: {
            assets: true,
            cachedModules: false,
            cachedAssets: false,
            chunks: false,
            colors: true,
            depth: true,
            entrypoints: false,
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
