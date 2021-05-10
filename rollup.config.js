import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const path = require("path");
const join = (...paths) => path.join(__dirname, ...paths);

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: join("assets", "js", "main.js"),
    output: {
      name: "main",
      file: join("static", "assets", "main.js"),
      format: "umd"
    },
    watch: {
      clearScreen: false,
      chokidar: {
        usePolling: true,
      },
      include: "assets/js/**",
    },
    plugins: [
      resolve(),
      production && terser(),
    ]
  },
  {
    input: join("assets", "js", "prism.js"),
    output: {
      name: "prism",
      file: join("static", "assets", "prism.js"),
      format: "umd"
    },
    plugins: [
      resolve(),
      production && terser(),
    ]
  },
  {
    input: "assets/css/style.css",
    output: {
      format: "iife",
      name: "app",
      file: "static/assets/style.css",
    },
    watch: {
      clearScreen: false,
      chokidar: {
        usePolling: true,
      },
      include: "assets/css/**",
    },
    plugins: [
      postcss({
        extract: true,
        config: true,
        sourceMap: !production ? "inline" : false,
      }),
    ],
  },
];
