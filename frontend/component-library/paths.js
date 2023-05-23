const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";
const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

module.exports = { NODE_ENV, DIST_DIR, SRC_DIR };
