const glob = require("glob");
const path = require("path");
const configs = require("../configs");
const globGroupPatterns = "{commons,library,system}";
const globPatterns = "{base,layouts,themes,devTools,vendors,components,patterns,modules,widgets,templates,products}";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { paths } = configs;
const generateHTMLWebpackPluginPages = (hbsEntries) => {
    return hbsEntries.reduce((accumulator, hbsEntry) => {
        const groupSlug = hbsEntry.split("/").slice(-5)[0];
        const categorySlug = hbsEntry.split("/").slice(-4)[0];
        const componentSlug = hbsEntry.split("/").slice(-3)[0];
        const variationName = hbsEntry.split("/").slice(-1)[0].split(".")[0];
        const metaFile = hbsEntry.split("/").slice(0, -2).join("/") + "/meta.json";
        accumulator[variationName] = new HtmlWebpackPlugin({
            template: hbsEntry,
            filename: path.join(paths.DIST_DIR, groupSlug, categorySlug, componentSlug, `${variationName}.html`),
            inject: false,
            chunks: ["runtime", "vendors", componentSlug],
        });
        return accumulator;
    }, {});
};

const getEntries = () => {
    const tsEntries = glob.sync(path.join(paths.SRC_DIR, globGroupPatterns, globPatterns, "*", "ts", "*.entry.ts"));
    const scssEntries = glob.sync(
        path.join(paths.SRC_DIR, globGroupPatterns, globPatterns, "**", "scss", "*.entry.scss")
    );
    const hbsEntries = glob.sync(
        path.join(paths.SRC_DIR, globGroupPatterns, globPatterns, "*", "markup", "*.entry.hbs")
    );

    const tsEntriesObj = tsEntries.reduce((accumulator, jsEntry) => {
        const groupSlug = jsEntry.split("/").slice(-5)[0];
        const categorySlug = jsEntry.split("/").slice(-4)[0];
        const componentSlug = jsEntry.split("/").slice(-3)[0];
        const variantSlug = jsEntry.split("/").slice(-1)[0].split(".")[0];
        accumulator[`${groupSlug}.${categorySlug}.${componentSlug}.${variantSlug}`] = jsEntry;
        return accumulator;
    }, {});

    const scssEntriesObj = scssEntries.reduce((accumulator, scssEntry) => {
        const groupSlug = scssEntry.split("/").slice(-5)[0];
        const categorySlug = scssEntry.split("/").slice(-4)[0];
        const componentSlug = scssEntry.split("/").slice(-3)[0];
        const variantSlug = scssEntry.split("/").slice(-1)[0].split(".")[0];
        accumulator[`${groupSlug}.${categorySlug}.${componentSlug}.miniCssExtract-${variantSlug}`] = scssEntry;
        return accumulator;
    }, {});

    const readmeEntries = glob
        .sync(path.join(paths.SRC_DIR, "*", "*", "readme.mdx"))
        .reduce((accumulator, readmeEntry) => {
            const categorySlug = readmeEntry.split("/").slice(-3)[0];
            const componentSlug = readmeEntry.split("/").slice(-2)[0];
            accumulator.push({ from: readmeEntry, to: `${categorySlug}/${componentSlug}` });
            return accumulator;
        }, []);

    const assetsEntries = glob.sync(path.join(paths.ASSETS_DIR, "*")).reduce((accumulator, assetEntry) => {
        const categorySlug = assetEntry.split("/").slice(-1)[0];
        accumulator.push({ from: assetEntry, to: `assets/${categorySlug}` });
        return accumulator;
    }, []);

    const metaEntries = glob
        .sync(path.join(paths.SRC_DIR, globGroupPatterns, globPatterns, "**", "meta.json"))
        .reduce((accumulator, metaEntry) => {
            const categorySlug = metaEntry.split("/").slice(-3)[0];
            const componentSlug = metaEntry.split("/").slice(-2)[0];
            accumulator.push(metaEntry);
            return accumulator;
        }, []);

    return {
        tsEntries,
        scssEntries,
        hbsEntries,
        tsEntriesObj,
        scssEntriesObj,
        readmeEntries,
        metaEntries,
        assetsEntries,
        htmlWebpackPluginPages: generateHTMLWebpackPluginPages(hbsEntries),
    };
};
module.exports = getEntries;
