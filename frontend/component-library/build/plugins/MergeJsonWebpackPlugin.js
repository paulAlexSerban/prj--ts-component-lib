const fs = require('fs');
const path = require('path');

class MergeJsonWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('MergeJsonWebpackPlugin', (compilation, callback) => {
      const mergedData = this.options.files.reduce((acc, file) => {
        const filePath = path.resolve(__dirname, file);
        if (fs.existsSync(filePath)) {
          const fileData = JSON.parse(fs.readFileSync(filePath));
          acc.push(fileData);
        }
        return acc;
      }, []);

      const mergedDataJson = JSON.stringify(mergedData, null, 2);
      compilation.assets[this.options.output] = {
        source: () => mergedDataJson,
        size: () => mergedDataJson.length
      };

      callback();
    });
  }
}

module.exports = MergeJsonWebpackPlugin;
