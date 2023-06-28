// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
const sourceMapLoader = {
  test: /\.js$/,
  loader: "source-map-loader"
}
module.exports = sourceMapLoader;