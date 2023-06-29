const process = require("process");
module.exports = function (varName) {
  return process.env[varName];
};