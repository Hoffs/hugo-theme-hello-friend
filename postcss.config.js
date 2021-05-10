const url = require("postcss-url");
const imports = require("postcss-import");
const nested = require("postcss-nested");
const postCSSPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const mixins = require("postcss-mixins");

const production = !process.env.ROLLUP_WATCH;

module.exports = () => ({
  plugins: [
    url,
    imports,
    mixins,
    nested,
    postCSSPresetEnv({
      stage: 1,
    }),
    production && cssnano({
      preset: "default",
    }),
  ],
});
