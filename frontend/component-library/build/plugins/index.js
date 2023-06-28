const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const DeleteScssPrefixedDirectoriesPlugin = require("./DeleteScssPrefixedDirectoriesPlugin");
const utils = require("../utils");
const { getEntries } = utils;
const { htmlWebpackPluginPages, metaEntries, readmeEntries } = getEntries();
const MergeJsonWebpackPlugin = require('./MergeJsonWebpackPlugin');


const plugins = [
    // use eslint to lint JavaScript code
    new ESLintPlugin(),
    // extract CSS styles into separate files
    new MiniCssExtractPlugin({
        filename: (all) => {
            const groupSlug = all.chunk.name.split(".")[0];
            const categorySlug = all.chunk.name.split(".")[1];
            const componentSlug = all.chunk.name.split(".")[2];
            const variantSlug = all.chunk.name.split(".")[3].split('-').splice(1).join('-');
            return `${groupSlug}/${categorySlug}/${componentSlug}/${variantSlug}.css`;
        },
    }),
    // clean the output directory before building
    new CleanWebpackPlugin(),
    // show progress during build process
    new webpack.ProgressPlugin(),
    // generate HTML file using *.hbs files as source
    ...Object.values(htmlWebpackPluginPages),
    new DeleteScssPrefixedDirectoriesPlugin(),
    new MergeJsonWebpackPlugin({
        files: metaEntries, // specify the input files here
        output: 'componentList.json' // specify the output file here
      })
];

module.exports = plugins;