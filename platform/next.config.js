const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[path][name]__[local]--[hash:base64:5]"
  }
});
