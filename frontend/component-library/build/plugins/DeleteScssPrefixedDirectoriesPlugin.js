const fs = require("fs");
const path = require("path");
 class DeleteScssPrefixedDirectoriesPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('DeleteScssPrefixedDirectoriesPlugin', (compilation) => {
      const outputPath = compiler.options.output.path;

      fs.readdir(outputPath, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }

        files.forEach((file) => {
          if (file.startsWith('cssExtract')) {
            const dirPath = path.join(outputPath, file);
            fs.stat(dirPath, (err, stats) => {
              if (err) {
                if (err.code === 'ENOENT') {
                  // Ignore the error if the file or directory doesn't exist
                  return;
                } else {
                  console.error(err);
                  return;
                }
              }

              if (stats.isDirectory()) {
                fs.rm(dirPath, { recursive: true }, (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    // console.log(`Removed: ${dirPath}`);
                  }
                });
              }
            });
          }
        });
      });
    });
  }
}

module.exports = DeleteScssPrefixedDirectoriesPlugin;