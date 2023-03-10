const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/minesweeper.js"),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devtool: "sourcemap",
  serve: "webpack serve --config config/webpack.dev.js --progress",
};
