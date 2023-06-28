const babel = require("./babel");
const handlebars = require("./handlebars");
const scss = require("./scss");
const assets = require("./assets");
const tsLoader = require("./tsLoader");
const sourceMapLoader = require("./sourceMapLoader");


module.exports = [babel, handlebars, scss, assets, tsLoader, sourceMapLoader];
