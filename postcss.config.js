module.exports = {
  plugins: [
    require("postcss-preset-env")({
      browsers: ["ie 8", "ie 10", "last 10 versions"]
    })
  ]
};
