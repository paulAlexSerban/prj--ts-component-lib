const process = require("process");
/**
 * returns path to assets depending on the name of the environment
 * @param {*} path
 * @param {*} resource
 * @returns
 */

module.exports = function (path, resource) {
    return `${process.env.ASSETS_PATH}/${path}/${resource}`;
};
