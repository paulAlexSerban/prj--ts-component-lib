// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
const tsLoader = { 
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: "ts-loader" 
};

module.exports = tsLoader;
