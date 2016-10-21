module.exports = {
  "local-plugins": true,
  "cssnano": {
    "sourcemap": true,
    "safe": true,
    "autoprefixer": false
  },
  "postcss-cssnext": {
    "browsers": [
      "last 3 version",
      "> 1%",
      "android >= 4.1",
      "ios >= 6",
      "ie >= 9",
      "chrome >= 34",
      "opera >= 12.1",
      "ff >= 38",
      "and_uc >= 10",
      "ie_mob >= 10"
    ]
  },
  "postcss-import": {
    onImport: function (sources) {
      global.watchCSS(sources);
    }
  }
};